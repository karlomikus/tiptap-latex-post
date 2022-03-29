<template>
  <node-view-wrapper>
      <div class="katex-component" :class="{'is-selected': selected}">
          <div class="katex-component__title">
            <h3>Math Input</h3>
            <a href="#" @click.prevent="deleteNode">Remove</a>
          </div>
          <textarea rows="3" v-model="rawFormula"></textarea>
          <div class="katex-component__formula" v-html="renderedFormula"></div>
      </div>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2'
import katex from 'katex';

export default {
  components: {
    NodeViewWrapper,
  },
  props: nodeViewProps,
  data() {
    return {
      rawFormula: this.node.attrs.content,
      options: {
        throwOnError: false,
        strict: false,
        displayMode: true,
        maxSize: 300
      }
    }
  },
  watch: {
    rawFormula(newVal, val) {
      if (newVal == val) {
        return;
      }

      // Update our <katex> content attribute
      // and notify editor of the change
      this.updateAttributes({
        content: newVal,
      })
    }
  },
  computed: {
    renderedFormula() {
      if (!this.rawFormula) {
        return '';
      }

      return katex.renderToString(this.rawFormula, this.options);
    }
  }
}
</script>
<style lang="css">
.katex-component {
  border: 2px solid #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: rgb(234, 241, 245);
  margin: 5px 0;
}
.katex-component.is-selected {
  border-color: rgb(33, 104, 211);
}
.katex-component h3 {
  margin: 0;
}
.katex-component__title {
  display: flex;
  margin-bottom: 20px;
}
.katex-component__title a {
  margin-left: auto;
}
.katex-component__formula {
  margin-top: 10px;
  background: rgba(0,0,0,.1);
  padding: 10px;
}
.katex-component textarea {
  padding: 10px;
  font-size: 1.2rem;
}
</style>
