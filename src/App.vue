<template>
  <div id="app">
    <tiptap v-model="editorContent" />
    <hr>
    <button type="button" class="btn-preview" @click="preview">Click here to preview</button>
    <hr>
    <div class="final-content">
      <h3>Preview:</h3>
      <div ref="content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import Tiptap from './components/TipTap.vue'
import katex from 'katex';

export default {
  name: 'App',
  components: {
    Tiptap
  },
  data() {
    return {
      editorContent: `<p>
          This is still the text editor you’re used to, but enriched with node views.
        </p>
        <katex content="\\langle\\nabla{L(\\gamma(t),t)},d_{t}\\gamma(t)\\rangle\\geq|\\nabla{L}|_{m}|d_{t}\\gamma(t)|_{m}"></katex>
        <p>
          Did you see that? That’s a Vue component. We are really living in the future.
        </p>
        <p>It works inline, checkout this <span data-inline-katex="true">a^2+b^2=c^2</span> theorem.</p>`,
        content: null,
    }
  },
  mounted() {
    this.preview();
  },
  methods: {
    preview() {
      this.content = this.editorContent;
      const previewDiv = document.querySelector('.final-content');
      setTimeout(() => {
        previewDiv.querySelectorAll('katex').forEach(el => {
          katex.render(el.getAttribute('content'), el, {
            throwOnError: false,
            strict: false,
            displayMode: true,
            maxSize: 300
          });
        })
        previewDiv.querySelectorAll('span[data-inline-katex]').forEach(el => {
          if (el.childElementCount > 0) {
            return false;
          }

          katex.render(el.innerText, el, {
            throwOnError: false,
            strict: false,
            displayMode: false,
            maxSize: 300
          });
        })
      }, 1)
    }
  }
}
</script>
<style lang="css">
@import "~katex/dist/katex.css";
body {
  font-family: sans-serif;
}
#app {
  width: 700px;
  margin: 0 auto;
}
.editor {
  border: 3px solid rgb(207, 90, 75);
  border-radius: 3%;
  padding: 10px;
}
.final-content {
  background: rgb(239, 243, 243);
  padding: 20px;
}
.final-content h3 {
  margin: 0 0 20px 0;
}
.btn-editor {
  border: 0;
  font-size: 1rem;
  background: rgb(255, 206, 141);
  padding: 4px 12px;
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer;
}
.btn-editor:hover, .btn-editor:active, .btn-editor:focus {
  background: rgb(207, 90, 75);
}
.btn-preview {
  border: 2px solid rgb(75, 207, 115);
  background: rgb(141, 255, 179);
  border-radius: 13px;
  display: block;
  width: 100%;
  font-size: 2rem;
  padding: 6px 12px;
}
</style>
