"use client"

import { CaseStudyTemplate } from "@/components/case-study-template"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { profile } from "@/lib/profile"
import Image from "next/image"

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-foreground font-semibold text-sm mt-6 mb-2 first:mt-0">
      {children}
    </h4>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
      {children}
    </p>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-xs font-mono text-foreground mb-3">
      <code>{children}</code>
    </pre>
  )
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed mb-3">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

function OL({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground leading-relaxed mb-3">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  )
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto mb-3 border border-border rounded-lg">
      <table className="w-full text-xs text-left">
        <thead className="bg-muted text-foreground">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-3 py-2 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-muted-foreground align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function RagAiSearchCaseStudy() {
  const project = profile.personalProjects.find(
    (p) => p.name === "RAG AI Search, a AI-powered retrieval-augmented generation (RAG) search app",
  )!

  return (
    <>
      <CaseStudyTemplate
        name={project.name}
        tagline="A retrieval-augmented Q&A app over indexed course lecture material — answers come only from what's retrieved, with citations, and an honest 'nothing found' when nothing is relevant."
        platform={project.platform}
        period={project.period}
        stack={project.stack}
        bullets={project.bullets}
        overview={[
          "RAG AI Search indexes CS382/SEIR course lecture PDFs and notes into a local FAISS vector store, then answers questions by retrieving the most relevant chunks and generating from them — never from general knowledge. Off-topic questions get an explicit \"nothing relevant found\" instead of a guessed answer.",
          "Two answer modes ship side by side: an extractive mode that highlights the most query-relevant sentences straight from retrieved chunks (no API key needed), and an optional Gemini-grounded mode that writes a cited answer strictly from the retrieved context. Running both against the same query makes it possible to tell whether a bad answer is a retrieval problem or a generation problem.",
          "The app is evaluated, not just demoed. EVALUATION.md documents a 13-query retrieval test (92% top-3 hit rate, 0.92 mean reciprocal rank), six end-to-end generation traces graded for grounding and citation accuracy, and a reranking before/after comparison — including a retrieval miss the corpus deliberately keeps in as a demonstration, discussed below.",
        ]}
        designNotes={[
          {
            title: "A similarity floor before generating",
            body: "Retrieval always returns its top-K nearest chunks, even for off-topic questions — cosine similarity has no built-in \"nothing matched\" signal. A tuned 0.25 cosine floor makes the app refuse instead of guessing: \"best chocolate cake recipe\" (0.14) and \"who won the 2022 World Cup\" (0.19) are correctly rejected without ever calling the LLM, while a genuine question scoring 0.29 clears the floor and gets a correct, cited answer.",
          },
          {
            title: "Measured: 92% hit-rate, 0.92 MRR over 13 queries",
            body: "rag/evaluate.py runs 13 hand-written queries against the full 16-document / 167-chunk corpus and checks whether the right source lands in the retrieved top-3 — 12 of 13 land there, most at rank 1 (PageRank 0.740, web crawling 0.719, BM25 0.709), despite noisy pypdf slide-text extraction the embeddings turned out to be robust to.",
          },
          {
            title: "The one miss is real, and it's explained",
            body: "\"What advanced techniques go beyond basic RAG retrieval?\" ranks the correct lecture chunk 4th (cosine 0.479), just outside top-3, because a leftover placeholder doc about RAG scores higher (0.607) for reading like clean, generic textbook prose. Noisy-but-correct slide text loses to fluent-but-generic text — kept in the corpus on purpose as a documented finding, not quietly cleaned up to inflate the score.",
          },
          {
            title: "Reranking widened that exact gap instead of closing it",
            body: "Cross-encoder reranking left the overall metrics unchanged (92% / 0.92) and made the one miss worse: the correct chunk's rerank score dropped to 0.163 while the generic placeholder rose to 0.925. ms-marco-MiniLM-L-6-v2 rewards fluent phrasing, and fragment-heavy slide text reads as less fluent even when it's the right answer — a genuine negative result, written up rather than hidden.",
          },
          {
            title: "Exact search over approximate",
            body: "At roughly 170 chunks, FAISS's brute-force IndexFlatIP is effectively free. An approximate index (IVF/HNSW) would only start paying off at a much larger corpus size.",
          },
        ]}
        links={[
          { label: "Live demo", href: "https://rag-search.sovandara.lol/", external: true },
          { label: "Source on GitHub", href: project.github ?? "", external: true },
          {
            label: "Project files (Drive)",
            href: "https://drive.google.com/drive/folders/1c2gRyGhZeCKQ7vTeZcR1Wm-nmLNHRmVN?usp=sharing",
            external: true,
          },
        ]}
      />

      {/* Full repo documentation, verbatim from README.md and EVALUATION.md */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card px-6 sm:px-8">
            <Accordion type="multiple">
              <AccordionItem value="readme">
                <AccordionTrigger className="text-base font-semibold text-foreground">
                  Full README.md
                </AccordionTrigger>
                <AccordionContent>
                  <H4>RAG-Based AI Search System</H4>
                  <P>
                    A Retrieval-Augmented Generation search app over CS382/SEIR course lecture
                    material: ask a question in the Streamlit UI, and it retrieves the most
                    relevant chunks from the indexed PDFs/notes and answers only from them, with
                    citations and similarity scores. Off-topic questions get an explicit "nothing
                    relevant found" instead of a guessed answer — this is a document search tool,
                    not a general-purpose chatbot.
                  </P>

                  <H4>Setup</H4>
                  <Code>{`pip install -r requirements.txt\nstreamlit run app.py`}</Code>
                  <P>
                    The first run downloads the all-MiniLM-L6-v2 embedding model (~80MB) via
                    sentence-transformers, so it needs an internet connection once; after that
                    it's cached locally. Open the URL Streamlit prints (usually
                    http://localhost:8501).
                  </P>
                  <P>
                    To use "llm" answer mode (grounded answers from Gemini instead of raw
                    extracted passages), put a Google AI Studio key in .env:
                  </P>
                  <Code>{`GEMINI_API_KEY=your-key-here`}</Code>
                  <P>
                    Edit .env directly rather than pasting a real key into chat or a terminal
                    command — it's easy to accidentally leak a key into logs or shell history
                    that way. Without a key, "llm" mode falls back to "extractive" mode with an
                    explanatory message; "extractive" mode needs no key at all.
                  </P>

                  <H4>Deployment (Dokploy)</H4>
                  <P>
                    The included Dockerfile builds a self-contained image (bakes in the
                    all-MiniLM-L6-v2 embedding model at build time, so there's no first-request
                    delay or Hugging Face dependency at runtime) and runs Streamlit headless on
                    $PORT (defaults to 8501).
                  </P>
                  <P>To deploy on Dokploy:</P>
                  <OL
                    items={[
                      "Create an Application, point it at this repo, and set the build type to Dockerfile.",
                      "Set the container port to 8501 (or whatever $PORT you configure).",
                      "Add GEMINI_API_KEY as an environment variable in the Dokploy dashboard to enable \"llm\" mode — do not commit .env or bake the key into the image (it's git-ignored here for that reason).",
                      "Deploy. The /_stcore/health endpoint is used for the container healthcheck.",
                    ]}
                  />
                  <P>To build/run it locally first:</P>
                  <Code>{`docker build -t rag-ai-search .\ndocker run -p 8501:8501 -e GEMINI_API_KEY=your-key-here rag-ai-search`}</Code>

                  <H4>System architecture</H4>
                  <div className="rounded-lg border border-border overflow-hidden bg-white mb-3">
                    <Image
                      src="/rag-ai-search/system-architecture.png"
                      alt="RAG AI Search system architecture diagram: documents are chunked and embedded into a vector DB; a user query is embedded, matched via semantic search, reranked/aggregated, then passed through an LLM prompt for generation."
                      width={1280}
                      height={1014}
                      className="w-full h-auto"
                    />
                  </div>
                  <P>
                    <em>
                      The repo diagram shows the LLM-generation path only. Extractive mode
                      (this app's default — no API key required) skips "Augmentation" and "LLM"
                      entirely: it goes straight from the retrieved/reranked chunks to a
                      highlighted-snippet answer. See step 6 below.
                    </em>
                  </P>
                  <OL
                    items={[
                      <>
                        <strong>Ingest &amp; chunk</strong> (rag/ingest.py) — loads .txt and .pdf
                        files (PDF text extraction via pypdf) and splits each document into
                        overlapping, fixed-size word chunks (chunk_text).
                      </>,
                      <>
                        <strong>Embed</strong> (rag/embed_store.py) — encodes each chunk into a
                        384-dim vector with sentence-transformers' all-MiniLM-L6-v2.
                      </>,
                      <>
                        <strong>Vector store</strong> (rag/embed_store.py) — L2-normalized
                        embeddings go into a local FAISS IndexFlatIP index; inner product over
                        normalized vectors is equivalent to cosine similarity.
                      </>,
                      <>
                        <strong>Retrieve</strong> (rag/embed_store.py) — the query is embedded the
                        same way and VectorStore.query() returns the nearest chunks by cosine
                        similarity. When reranking is on (see next step), a wider candidate pool
                        (max(top_k * 4, 15)) is retrieved instead of just top-K, then narrowed
                        back down after reranking.
                      </>,
                      <>
                        <strong>Rerank &amp; aggregate</strong> (rag/rerank.py, optional, on by
                        default) — chunks that clear the relevance floor are re-scored with a
                        cross-encoder (cross-encoder/ms-marco-MiniLM-L-6-v2), which judges
                        query/chunk relevance jointly instead of comparing independent embeddings.
                        The top-K survivors are kept in cross-encoder order (their original cosine
                        score travels with them for the floor/display logic, unchanged); any
                        chunks that are adjacent, same-document neighbors among those top-K are
                        merged into a single contiguous passage. See EVALUATION.md's "Reranking
                        evaluation" section for a measured before/after comparison — including a
                        documented case where reranking does not help.
                      </>,
                      <>
                        <strong>Generate</strong> (rag/generate.py) — retrieved chunks below a
                        minimum similarity score are dropped (filter_relevant); if none remain,
                        the app returns a "nothing relevant found" message without calling an LLM.
                        Otherwise, either extractive_answer (picks the most query-relevant
                        sentence(s) out of each retrieved chunk and bolds the matched terms, no
                        API key needed) or llm_answer (sends the chunks + query to Gemini and asks
                        it to answer only from them, with citations) produces the final answer.
                      </>,
                      <>
                        <strong>Interface</strong> (app.py) — Streamlit UI: query box, answer
                        panel, an expandable/scored/term-highlighted sources panel, and a settings
                        sidebar (top-K, a reranking on/off toggle, answer mode, Gemini model
                        picker, chunk size/overlap, file upload for searching your own .txt/.pdf
                        docs alongside the indexed corpus).
                      </>,
                    ]}
                  />

                  <H4>Design decisions</H4>
                  <UL
                    items={[
                      <>
                        <strong>Fixed-size word chunking with overlap</strong>, not sentence- or
                        section-aware chunking. Simple, dependency-free, and works uniformly
                        across the noisy, inconsistently-formatted text that pypdf extracts from
                        lecture slides. Chunk size/overlap are adjustable from the sidebar;
                        overlap is always clamped below chunk_size (see rag/ingest.py) since the
                        naive stepping loop would never terminate otherwise.
                      </>,
                      <>
                        <strong>all-MiniLM-L6-v2 for embeddings</strong> — small, fast, runs
                        locally with no API key, and accurate enough for this corpus size (see
                        EVALUATION.md: 92% top-3 hit rate over 13 test queries).
                      </>,
                      <>
                        <strong>FAISS IndexFlatIP</strong> (exact brute-force search) rather than
                        an approximate index — at ~170 chunks, exact search is effectively free,
                        and an approximate index (IndexIVFFlat/IndexHNSWFlat) would only pay off
                        at a much larger corpus scale.
                      </>,
                      <>
                        <strong>Two answer modes.</strong> extractive needs no API key and makes
                        it possible to verify retrieval quality independent of generation quality
                        — useful when debugging whether a bad answer is a retrieval problem or a
                        generation problem. llm (Google AI Studio's Gemini) produces a written,
                        cited answer grounded strictly in the retrieved chunks.
                      </>,
                      <>
                        <strong>A minimum-similarity floor before generating</strong>{" "}
                        (MIN_SIMILARITY = 0.25 in rag/generate.py). Retrieval always returns its
                        top-K nearest chunks even for completely off-topic questions — cosine
                        similarity has no built-in "nothing matched" signal — so without a floor,
                        the system would synthesize an answer from irrelevant chunks instead of
                        admitting it found nothing. The threshold was picked by inspecting the
                        score distribution on this corpus: correct hits scored as low as 0.29,
                        while clearly off-topic probe queries topped out around 0.14-0.19 (see
                        EVALUATION.md).
                      </>,
                      <>
                        <strong>Cross-encoder reranking operates on cosine score, not its own
                        score.</strong> rag/rerank.py's cross-encoder decides ranking order and
                        which chunks survive the narrowing to top-K, but the relevance floor and
                        every downstream display value still use each chunk's original cosine
                        score. This keeps the already-calibrated 0.25 floor valid without
                        retuning, and keeps rag/generate.py completely unaware reranking exists —
                        it still just receives a List[Tuple[Chunk, float]]. The cross-encoder
                        score is surfaced separately, as a secondary badge, in the sources panel.
                      </>,
                    ]}
                  />

                  <H4>Project structure</H4>
                  <Code>{`final_project_starter/
├── app.py                  # Streamlit interface
├── requirements.txt
├── EVALUATION.md            # retrieval + answer-quality eval results and write-up
├── data/sample_docs/        # CS382/SEIR lecture PDFs + a few placeholder .txt samples
├── rag/
│   ├── ingest.py            # load + chunk documents
│   ├── embed_store.py       # embed (sentence-transformers) + FAISS similarity search
│   ├── rerank.py            # cross-encoder reranking + adjacent-chunk aggregation
│   ├── generate.py          # relevance filtering + turn retrieved chunks into an answer
│   └── evaluate.py          # hit-rate / MRR evaluation harness (baseline vs. reranked)
└── tests/                   # unit tests (pytest) for ingest/generate/embed_store/rerank`}</Code>

                  <H4>Evaluation</H4>
                  <P>
                    rag/evaluate.py runs 13 hand-written test queries against the full corpus and
                    reports hit rate / mean reciprocal rank for retrieval:
                  </P>
                  <Code>{`python -m rag.evaluate`}</Code>
                  <P>
                    EVALUATION.md has the full results table plus a written discussion of
                    retrieval quality, answer quality (including citation accuracy and the
                    graceful-failure behavior), successes, and limitations.
                  </P>

                  <H4>Running the unit tests</H4>
                  <Code>{`python -m pytest tests/ -v`}</Code>
                  <P>
                    Unit tests for the chunking, relevance-filtering, and retrieval logic (fast,
                    no network calls beyond the one-time embedding model download) — distinct
                    from rag/evaluate.py, which measures end-to-end retrieval quality against
                    real queries.
                  </P>

                  <H4>Known limitations</H4>
                  <UL
                    items={[
                      <>
                        <strong>Generation quality is bottlenecked by retrieval.</strong> If the
                        right chunk isn't retrieved, the LLM correctly declines to answer from
                        what it wasn't given rather than hallucinating — but the user still
                        doesn't get a full answer. See the one retrieval miss discussed in
                        EVALUATION.md.
                      </>,
                      <>
                        <strong>The relevance floor is a coarse heuristic, not a learned
                        classifier.</strong> It's a single global cosine-similarity cutoff tuned
                        by inspecting score distributions on this specific corpus, not something
                        that adapts to query type. A borderline off-topic query that happens to
                        share vocabulary with the corpus could still slip past it.
                      </>,
                      <>
                        <strong>PDF slide text extraction is noisy</strong> — pypdf sometimes runs
                        titles and words together (e.g. "THE MAGICBEHIND THESEARCH BOX").
                        Embeddings are fairly robust to this, but it occasionally shows up
                        verbatim in extractive answers or quoted fragments.
                      </>,
                      <>
                        <strong>No multi-hop reasoning.</strong> Each answer comes from a single
                        retrieval pass; a question that requires combining facts from two corpus
                        sections that don't share vocabulary (so both wouldn't be retrieved
                        together) won't be answered completely.
                      </>,
                      <>
                        <strong>Small, static corpus.</strong> 16 documents / ~167 chunks, indexed
                        with an exact-search FAISS index. Uploading extra files at query time
                        works but triggers a full rebuild of the in-memory index (no incremental
                        indexing).
                      </>,
                      <>
                        <strong>Reranking is not guaranteed to help, and can amplify an existing
                        bias.</strong> On this corpus it left hit-rate/MRR unchanged (92%, 0.92
                        both ways) and did not fix the one documented retrieval miss — the
                        cross-encoder is more sensitive to fluent, well-formed phrasing than
                        cosine similarity is, which made it favor a generic placeholder chunk even
                        more strongly over noisier-but-correct real lecture content. See
                        EVALUATION.md's "Reranking evaluation" section.
                      </>,
                    ]}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="evaluation">
                <AccordionTrigger className="text-base font-semibold text-foreground">
                  Full EVALUATION.md
                </AccordionTrigger>
                <AccordionContent>
                  <H4>Retrieval Evaluation</H4>
                  <P>
                    Run with python -m rag.evaluate (must be run as a module from the project root
                    so the relative imports in rag/ resolve). It sends 13 hand-written test
                    queries against the full data/sample_docs/ corpus — 12 real CS382/SEIR lecture
                    PDFs plus 4 leftover placeholder .txt samples from the starter — checks
                    whether an acceptable source document appears in the top-3 retrieved chunks,
                    and reports hit rate + mean reciprocal rank (MRR). A few queries list two
                    acceptable source docs where an old placeholder sample and a real lecture
                    genuinely cover the same topic. It runs the suite twice: once against plain
                    cosine top-k, once through the cross-encoder reranking + aggregation step in
                    rag/rerank.py (see "Reranking evaluation" below).
                  </P>

                  <H4>
                    Results (embeddings backend: all-MiniLM-L6-v2 + FAISS, chunk_size=80,
                    overlap=20, 16 docs / 167 chunks)
                  </H4>
                  <Table
                    head={["Query", "Acceptable doc(s)", "Rank", "Top score"]}
                    rows={[
                      ["What happens if I turn in an assignment late?", "Course Policies", "1", "0.460"],
                      ["How does BM25 improve on TF-IDF for ranking search results?", "CS382 Week4", "1", "0.709"],
                      ["What are the steps to turn raw text into a searchable index, like tokenization and stemming?", "Week2 SEIR", "1", "0.564"],
                      ["What are classic information retrieval models like the vector space model?", "SEIR - Week3 Classic IR", "1", "0.622"],
                      ["How do you evaluate search quality using precision and recall?", "SEIR Week 5 - IR Evaluation & Query Processing", "1", "0.643"],
                      ["What is web crawling and how do search engines discover pages?", "SEIR Week6 - Web Crawling", "1", "0.719"],
                      ["How do neural embeddings work for search, and what is a vector database?", "SEIR Week 8- Neural IR & Vector Databases, Vector Databases", "1", "0.598"],
                      ["How does RAG combine retrieval and generation?", "SEIR Week 9 - RAG Architecture, Rag Systems", "1", "0.685"],
                      ["What advanced techniques go beyond basic RAG retrieval?", "CS382-Week11 Advanced RAG", "MISS", "0.607"],
                      ["How does the PageRank algorithm rank web pages using links?", "SEIR Week12 The PageRank Algorithm", "1", "0.740"],
                      ["How can search results be biased against certain groups?", "SEIR Week13 EthicsIR", "1", "0.476"],
                      ["How do recommender systems suggest items to users?", "SEIR Week14 Recommender System, Recommender Systems", "1", "0.745"],
                      ["What is the cold-start problem in recommendation?", "SEIR Week14 Recommender System, Recommender Systems", "1", "0.292"],
                    ]}
                  />
                  <P>
                    <strong>Hit rate (top-3): 92% (12/13)</strong>
                    <br />
                    <strong>Mean reciprocal rank: 0.92</strong>
                  </P>

                  <H4>What worked</H4>
                  <P>
                    Once the real CS382/SEIR lecture PDFs were added, retrieval was strong and
                    confident across nearly every topic — PageRank (0.740), web crawling (0.719),
                    and BM25 (0.709) all landed a clean rank-1 hit despite the query phrasing never
                    quoting the slides verbatim. Slide text extracted via pypdf is noisy (titles
                    run together like "THE MAGICBEHIND THESEARCH BOX"), but the sentence
                    embeddings were robust to that noise — semantic meaning survived even when
                    whitespace didn't.
                  </P>

                  <H4>What didn't work, and why</H4>
                  <P>
                    The one miss — "What advanced techniques go beyond basic RAG retrieval?" — is
                    caused by the leftover placeholder docs, not the real content. Checking the
                    full ranking:
                  </P>
                  <Code>{`0.607  Rag Systems (placeholder .txt)         "...generates an answer grounded in the retrieved text..."
0.513  Rag Systems (placeholder .txt)         "Retrieval-Augmented Generation (RAG) RAG systems combine..."
0.496  SEIR Week 9 - RAG Architecture          "...THE OPEN-BOOK TEST ANALOGY..."
0.479  CS382-Week11 Advanced RAG               "...SIMPLE RAG VS. ADVANCED RAG..."`}</Code>
                  <P>
                    CS382-Week11 Advanced RAG.pdf actually contains the exact right chunk
                    ("SIMPLE RAG VS. ADVANCED RAG") — it just ranks 4th, one spot outside top-3,
                    because the old rag_systems.txt sample doc is clean, generic, textbook-style
                    prose about RAG in general. That kind of writing embeds very "centrally" in
                    semantic space, so it scores well against almost any RAG-flavored question
                    even though it's less specific than the real lecture. The noisier slide text,
                    by contrast, embeds a little further from the query because of formatting
                    artifacts from PDF extraction.
                  </P>
                  <P>
                    Takeaway: <strong>leftover placeholder sample docs aren't just harmless
                    clutter — they can actively outrank more specific real content on generic
                    queries.</strong> This corpus deliberately keeps them in (per project
                    decision) as a demonstration of that effect; removing rag_systems.txt /
                    recommender_systems.txt / vector_databases.txt would likely fix this miss and
                    is worth trying via a quick rm if a cleaner corpus is wanted later.
                  </P>

                  <H4>Reranking evaluation</H4>
                  <P>
                    rag/rerank.py adds a cross-encoder (cross-encoder/ms-marco-MiniLM-L-6-v2)
                    reranking + adjacent-chunk-aggregation step: retrieve a wider candidate pool
                    (15 chunks) by cosine similarity, drop anything below the relevance floor,
                    re-score the survivors with the cross-encoder, and keep the new top-3.
                  </P>
                  <Table
                    head={["", "Hit rate (top-3)", "MRR"]}
                    rows={[
                      ["Baseline (cosine top-k)", "92% (12/13)", "0.92"],
                      ["Reranked (cross-encoder)", "92% (12/13)", "0.92"],
                    ]}
                  />
                  <P>
                    No change in either metric — and, notably, <strong>reranking does not fix the
                    "advanced RAG techniques" miss above</strong>. Inspecting the reranked scores
                    for that query explains why:
                  </P>
                  <Code>{`cos=0.513  rerank=0.925  Rag Systems (placeholder)       "RAG systems combine a retrieval step..."
cos=0.607  rerank=0.578  Rag Systems (placeholder)       "...generates an answer grounded in the retrieved text..."
cos=0.496  rerank=0.394  SEIR Week 9 - RAG Architecture   "...THE OPEN-BOOK TEST ANALOGY..."
cos=0.479  rerank=0.163  CS382-Week11 Advanced RAG        "...SIMPLE RAG VS. ADVANCED RAG..."`}</Code>
                  <P>
                    The cross-encoder widens the gap in favor of the generic placeholder text
                    instead of closing it. ms-marco-MiniLM-L-6-v2 is trained on fluent web
                    passage/query pairs, and the placeholder rag_systems.txt chunk reads like a
                    clean, well-formed definition of RAG — exactly what that model was trained to
                    reward. The real lecture chunk with the correct answer ("SIMPLE RAG VS.
                    ADVANCED RAG") is choppy, fragment-heavy slide text extracted by pypdf, and the
                    fluency-sensitive cross-encoder scores it even worse, proportionally, than
                    plain cosine similarity did.
                  </P>
                  <P>
                    <strong>Takeaway: reranking is not a strict improvement over cosine
                    similarity — it changes what kind of relevance gets rewarded</strong> (fluent,
                    well-formed phrasing vs. general topical/semantic similarity). When a corpus's
                    noisy but correct content competes against clean, generic-but-less-specific
                    content, a fluency-sensitive reranker can make that particular failure mode
                    worse, not better. The "leftover placeholder docs can outrank more specific
                    real content" issue identified above turns out to be robust to reranking, not
                    just a cosine-similarity quirk.
                  </P>
                  <P>
                    On other queries in the suite, reranking mostly reorders which chunk within an
                    already-correct document scores highest (e.g. the top chunk under "How do you
                    evaluate search quality...?" changes from cosine 0.643 to a different chunk at
                    cosine 0.570, both from the correct document) without changing which document
                    wins — consistent with a corpus where baseline cosine retrieval was already
                    strong (92% hit rate) and there's limited headroom for a reranker to
                    demonstrate a clear win. This is a genuine negative result for this corpus, not
                    a bug: see tests/test_rerank.py for evidence the reranking logic itself works
                    correctly (it does reorder a synthetic obviously-irrelevant-vs-relevant pair
                    correctly) — it's this specific corpus's noisy-vs-fluent tradeoff that it
                    doesn't help with.
                  </P>

                  <H4>Answer quality (generation, llm mode via Gemini)</H4>
                  <P>
                    The retrieval table above only measures whether the right document showed up
                    — it says nothing about whether the generated answer is any good, grounded, or
                    honest when nothing relevant exists. Six representative queries, run
                    end-to-end through generate_answer(..., mode="llm") (Gemini gemini-2.5-flash):
                  </P>
                  <Table
                    head={["Query", "Behavior"]}
                    rows={[
                      [
                        "How does BM25 improve on TF-IDF for ranking results?",
                        "Correct, well-structured answer (term-frequency saturation, length normalization, smoothed IDF), cited CS382 Week4 throughout.",
                      ],
                      [
                        "What advanced techniques go beyond basic RAG retrieval?",
                        "Honestly said the sources didn't cover it, rather than guessing — because the retrieval miss above means the real \"Advanced RAG\" PDF chunk wasn't in the top-3 context it was given.",
                      ],
                      [
                        "What is the cold-start problem in recommendation?",
                        "Correct, cited SEIR Week14 Recommender System, and low top score (0.29) still cleared the 0.25 relevance floor.",
                      ],
                      [
                        "How can search results be biased against certain groups?",
                        "Synthesized three distinct points (disparate impact, personalization/\"echo chamber\", relevance being user-dependent) across two source documents with citations for each.",
                      ],
                      [
                        "What is the best recipe for chocolate cake?",
                        "Correctly refused — top score 0.14, below the relevance floor, so the LLM was never called and the \"nothing relevant found\" message was returned instead.",
                      ],
                      [
                        "Who won the 2022 soccer World Cup?",
                        "Same graceful refusal as above (top score 0.19).",
                      ],
                    ]}
                  />

                  <H4>Successes</H4>
                  <UL
                    items={[
                      <>
                        Grounded citations are accurate: every generated answer names the specific
                        source document(s) it drew from, and spot-checking those citations against
                        the actual chunk text confirms the claims are actually supported by it.
                      </>,
                      <>
                        The relevance floor (MIN_SIMILARITY = 0.25 in rag/generate.py) correctly
                        rejects clearly off-topic queries (chocolate cake, World Cup) without ever
                        calling the LLM, satisfying the "don't hallucinate when nothing's relevant"
                        requirement and saving an API call in the process.
                      </>,
                      <>
                        When retrieval does surface the right chunks, the LLM does not overreach
                        beyond them — see the "advanced RAG techniques" answer, which stated the
                        limitation instead of fabricating advanced-RAG content it hadn't actually
                        been given.
                      </>,
                    ]}
                  />

                  <H4>Limitations</H4>
                  <UL
                    items={[
                      <>
                        <strong>Generation quality is bottlenecked by retrieval.</strong> The one
                        retrieval miss (advanced RAG techniques) directly caused an incomplete
                        answer even though generation itself behaved correctly — the LLM can only
                        be grounded in whatever the retriever hands it.
                      </>,
                      <>
                        <strong>The relevance floor is a coarse heuristic, not a learned
                        classifier.</strong> It's a single global cosine-similarity cutoff picked
                        by inspecting score distributions on this corpus, not something that
                        adapts to query type or corpus. A borderline off-topic query that happens
                        to share vocabulary with the corpus (e.g. a question about "ranking" in a
                        non-search-engine sense) could still slip past the 0.25 floor and get an
                        answer synthesized from marginally-related chunks.
                      </>,
                      <>
                        <strong>PDF slide extraction is noisy</strong> (mashed-together title
                        text), which occasionally shows up verbatim in generated answers (e.g.
                        quoted fragments with missing spaces) even though the underlying claim is
                        correct.
                      </>,
                      <>
                        <strong>No multi-hop reasoning.</strong> Each answer is generated from a
                        single retrieval pass; a question that requires combining facts from two
                        unrelated parts of the corpus that don't share vocabulary (so both
                        wouldn't be retrieved together) would not be answered completely.
                      </>,
                      <>
                        <strong>Reranking doesn't always help, and can amplify an existing failure
                        mode.</strong> The cross-encoder is more sensitive to fluent, well-formed
                        phrasing than cosine similarity is, which made it favor a generic
                        placeholder chunk more strongly than cosine did, over noisier-but-correct
                        real lecture content. Reranking is on by default in the app because it's
                        neutral-to-positive on this corpus overall, not because it's guaranteed to
                        improve any given query.
                      </>,
                    ]}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
