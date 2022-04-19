import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import Component from './FormulaComponent.vue'

export default Node.create({
  name: 'formulaComponent',

  // Extensions group
  group: 'block',

  // Don't allow selection
  selectable: false,

  // Add "content" attribute to our element
  // We are going to use this attribute as a
  // container for our latex content
  addAttributes() {
    return {
      content: {
        default: '',
        renderHTML: attributes => {
          return {
            content: attributes.content
          }
        }
      }
    }
  },

  // Parse all <katex> tags
  parseHTML() {
    return [
      {
        tag: 'katex',
      },
      {
        tag: 'dl', // Parse wikipedia block element math formula
        getAttrs: element => {
          let match = element.querySelector('math');
          if (!match) {
            return false;
          }

          return {content: match.getAttribute('alttext')}
        }
      }
    ]
  },

  // Render our <katex> tag and merge it with our "content" attribute
  renderHTML({ HTMLAttributes }) {
    return ['katex', mergeAttributes(HTMLAttributes)]
  },

  // Use our Vue component as node view
  addNodeView() {
    return VueNodeViewRenderer(Component)
  },

  // Insert math block at the specific cursor position
  addCommands() {
    return {
      addKatex: (attrs) => ({state, dispatch}) => {
        const { selection } = state
        const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
        const node = this.type.create(attrs)
        const transaction = state.tr.insert(position, node);

        dispatch(transaction);
      }
    }
  }
})
