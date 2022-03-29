<template>
    <div class="editor">
        <div class="editor-toolbar" v-if="editor">
            <button type="button" class="btn-editor" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                Bold
            </button>
            <button type="button" class="btn-editor" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                Italic
            </button>
            <button type="button" class="btn-editor" @click="editor.chain().focus().toggleFormulaMark().run()" :class="{ 'is-active': editor.isActive('formulaMark') }">
                Inline math
            </button>
            <button type="button" class="btn-editor" @click="editor.chain().focus().addKatex().run()" :class="{ 'is-active': editor.isActive('formulaNode') }">
                Math block
            </button>
        </div>
        <editor-content :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import FormulaComponent from './FormulaExtension.js'
import FormulaMark from './FormulaMark.js'

export default {
  components: {
    EditorContent,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  computed: {
    resultAsHtml() {
      if (!this.editor) {
        return '';
      }

      return this.editor.getHTML();
    }
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit,
        FormulaComponent,
        FormulaMark
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
<style lang="css">
.editor span[data-inline-katex] {
  background: rgb(255, 252, 196);
  padding: 2px;
  display: inline-block;
}
</style>
