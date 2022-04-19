import { Mark, mergeAttributes } from '@tiptap/core'

export default Mark.create({
    name: 'formulaMark',

    // Don't allow any other marks inside this one
    excludes: '_',

    // Forbid spanning across multiple lines
    spanning: false,

    // This will parse <span data-inline-katex="true">...</span>
    parseHTML() {
        return [
            { tag: 'span[data-inline-katex="true"]' },
            {
                tag: 'span.mwe-math-element', // Parse wikipedia inline element math formula
                getAttrs: element => {
                    if (element.querySelectorAll('math').length == 0) {
                        return false;
                    }
                    return element.querySelector('math').getAttribute('alttext')
                }
            }
        ]
    },

    // This will render <span data-inline-katex="true">...</span>
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes, {'data-inline-katex': 'true'}), 0]
    },

    // Add commands so that we can call them from the editor
    addCommands() {
        return {
            setFormulaMark: attributes => ({ commands }) => {
                return commands.setMark(this.name, attributes)
            },
            toggleFormulaMark: attributes => ({ commands }) => {
                return commands.toggleMark(this.name, attributes)
            },
            unsetFormulaMark: () => ({ commands }) => {
                return commands.unsetMark(this.name)
            },
        }
    },
})
