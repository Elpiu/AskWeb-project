import re
import os
import numpy as np
import torch
import openai
from sentence_transformers import SentenceTransformer, util

# Sia Text il contenuto della pagina web e Domanda la query dell'utente
with open("frist.txt", "r", encoding="utf-8") as file:
    Text = file.read()
Domanda = "Non riesco più a sborrare aiuto"

model = SentenceTransformer('msmarco-distilbert-base-v4')
openAI_key = "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"
chunk_size = 400
n_chunks = 9
embeddings_file = f"embeddings.npz"


def preprocess(text):
    text = text.replace('\n', ' ')
    text = re.sub('\s+', ' ', text)
    return text


def text_to_chunks(text, overlap_percentage=0.2):
    chunks = []
    overlap_size = int(chunk_size * overlap_percentage)
    start = 0
    end = chunk_size
    counter = 1

    while start < len(text):
        chunk = text[start:end]
        chunk_with_counter = f'[{counter}] {chunk}'
        chunks.append(chunk_with_counter + '\n\n')
        start += chunk_size - overlap_size
        end = start + chunk_size
        counter += 1
    return chunks


class SemanticSearch:
    def __init__(self):
        self.fitted = False

    def encode(self, chunk):
        embeddings = model.encode(chunk)
        return embeddings

    def fit(self, data, batch=1000):
        self.data = data
        self.corpus_embeddings = self.get_text_embedding(data, batch=batch)
        self.fitted = True

    def fit2(self, embeddings_file):
        stored = np.load(embeddings_file)
        self.corpus_embeddings = stored["embeddings"]
        self.dim_corpus = stored["dim_corpus"]
        self.fitted = True

    # restituisco i top n chunks più simili alla domanda
    def __call__(self, text):  # text è la domanda input dell'utente
        top_k = min(n_chunks, self.dim_corpus)
        domanda_embeddings = self.encode([text])  # embedding applicato alla domanda
        scores = util.cos_sim(domanda_embeddings, self.corpus_embeddings)[0]
        # scores = util.dot_score(domanda_embeddings, self.corpus_embeddings)[0]
        top_results = torch.topk(scores, k=top_k)
        return [self.data[i] for i in top_results[1]]

    # questa è la classe che fa l'embedding sul contenuto del pdf
    def get_text_embedding(self, texts, batch):
        embeddings = []
        print(f"Numero di chunks nel documento: {len(texts)}")
        self.dim_corpus = len(texts)

        for i in range(0, len(texts), batch):
            text_batch = texts[i:(i + batch)]
            emb_batch = self.encode(text_batch)  # chiamo il modello
            embeddings.append(emb_batch)
        embeddings = np.vstack(embeddings)  # a function provided by NumPy that takes a sequence of arrays and stacks them vertically to form a new array.
        return embeddings


def generate_text(openAI_key, prompt, engine="text-davinci-003"):
    openai.api_key = openAI_key
    completions = openai.Completion.create(
        engine=engine,
        prompt=prompt,
        max_tokens=500,  # incide sulla lunghezza della risposta output, quindi sul prezzo della chiamata
        n=1,
        stop=None,
        temperature=0.7,  # più è basso meno si spende, forse
    )
    message = completions.choices[0].text
    return message


def generate_answer(question, openAI_key):
    # genero i chunks
    topn_chunks = recommender(question)
    prompt = ""
    prompt += 'search results:\n\n'
    for c in topn_chunks:
        prompt += ''.join(c)

    prompt += "Instructions: Compose a comprehensive reply to the query using the search results given. " \
              "If the search results mention multiple subjects with the same name, create separate answers for each. " \
              "Only include information found in the results and don't add any additional information. " \
              "Make sure the answer is correct and don't output false content. " \
              "If the text does not relate to the query, simply state 'Non è stata trovata una risposta alla tua domanda nella pagina web selezionata'." \
              "Ignore outlier search results which has nothing to do with the question. Only answer what is asked. " \
              "The answer should be short and concise. Answer step-by-step. \n"

    prompt += f"Query: {question}\nAnswer:"
    print(prompt)
    answer = generate_text(openAI_key, prompt, "text-davinci-003")
    # answer = prompt
    return answer

if os.path.exists("embeddings.npz"):
    os.remove("embeddings.npz")

recommender = SemanticSearch()

if os.path.isfile(embeddings_file):
    recommender.fit2(embeddings_file)
    print("Embeddings loaded from file")
else:
    chunks = text_to_chunks(Text)
    recommender.fit(chunks)
    np.savez(embeddings_file, embeddings=recommender.corpus_embeddings, dim_corpus=recommender.dim_corpus)

if(recommender.fitted):
    answer = generate_answer(Domanda, openAI_key)

print(answer)
