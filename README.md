# Co-writer Phone Test

A one-page test that tells whether a phone can run BookBuilder's co-writer on its own: **paragraphs on this phone**,
**sentences on this phone**, or **use the server co-writer**.

Open it in Chrome on the phone: **https://ezappsllc.github.io/bookbuilder-phone-test/**

1. The page shows the phone: model, Android and Chrome versions, CPU, GPU (WebGPU), threads, space.
2. Pick a test: **Quick** (≈ 0.8 GB, Qwen3 0.6B), **Standard** (≈ 1.3 GB, Qwen3 1.7B on the GPU) or **Flagship**
   (≈ 2.7 GB, Qwen3 4B on the GPU). Use Wi-Fi, keep the tab in front and the screen on.
3. It runs the GPU engine (WebLLM 0.2.87 over WebGPU), then the CPU engine (llama.cpp in WebAssembly, wllama 2.4.0),
   on two prompts of BookBuilder's size and shape: a short scene (~700 tokens) and a chapter with three character
   cards (~1,500 tokens). A crash or hang is recorded and the test moves on.
4. **Copy results** copies a summary line and the full results as JSON. **Delete downloaded models** frees the space.

## How it decides

On the chapter prompt: **paragraphs** if the first word comes within 15 seconds and it writes at least 12 tokens a
second; **sentences** within 45 seconds and at least 4 tokens a second; otherwise the server. A token is about three
quarters of a word.

## Privacy

Models download from Hugging Face, and the engines from jsDelivr. Everything runs in the phone's browser; nothing is
sent anywhere, and results stay on the phone until you copy them. The prompts were built by BookBuilder from its
sample book, with the co-writer's instructions replaced by stand-in text of the same length.

## Files

- `index.html`: the page.
- `coi-sw.js`: a service worker that adds the cross-origin isolation headers GitHub Pages can't send, so the CPU
  engine can use several threads.
- `prompts.json`: the two prompts.

The first phone measured, a 2020 Sony Xperia 1 II (Snapdragon 865), lost its GPU at the first token in every run
(an October 2021 Vulkan driver) and needed 80 to 176 seconds to read a prompt on the CPU: **use the server**.
