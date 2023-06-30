import '../styles/keditor-component-text.less';

import KEditor from 'keditor';
// Import TinyMCE
import tinymce from 'tinymce/tinymce';

CKEDITOR.disableAutoInline = true;

// Text component
// ---------------------------------------------------------------------
KEditor.components['text'] = {
    options: {
        plugins: [
            'advlist autolink lists link image charmap print preview anchor textcolor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code help wordcount'
        ],
        toolbar: 'insert | undo redo |  formatselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    },

    init: function (contentArea, container, component, keditor) {
        let self = this;
        let options = keditor.options;

        let componentContent = component.children('.keditor-component-content');
        componentContent.prop('contenteditable', true);

        componentContent.on('input', function (e) {
            if (typeof options.onComponentChanged === 'function') {
                options.onComponentChanged.call(keditor, e, component);
            }

            if (typeof options.onContainerChanged === 'function') {
                options.onContainerChanged.call(keditor, e, container, contentArea);
            }

            if (typeof options.onContentChanged === 'function') {
                options.onContentChanged.call(keditor, e, contentArea);
            }
        });

        let editor = CKEDITOR.inline(componentContent[0], self.options);
        editor.on('instanceReady', function () {
            $('#cke_' + componentContent.attr('id')).appendTo(keditor.wrapper);

            if (typeof options.onComponentReady === 'function') {
                options.onComponentReady.call(contentArea, component, editor);
            }
        });

        editor.on('key', function (event) {
            const isCtrl = event.data.domEvent.$.ctrlKey;
            if ((isCtrl && event.data.domEvent.$.keyCode === 86) || event.data.domEvent.$.keyCode === 13) {
                console.log('Dont scroll!!')
                keditor.iframeBody.scrollTop($(editor.element.$).offset().top);
                // componentContent.css('height', 200);
                // keditor.iframeBody.css('overflow', 'visible');
                setTimeout(() => {
                    // event.cancel();
                    // console.log(window);
                    // keditor.iframeBody.css('overflow', '');
                    // keditor.iframeBody.scrollTop($(editor.element.$).offset().top);
                }, 10);
            }
        }, editor);
    },

    getContent: function (component, keditor) {
        let componentContent = component.find('.keditor-component-content');
        let id = componentContent.attr('id');
        let editor = CKEDITOR.instances[id];
        if (editor) {
            return editor.getData();
        } else {
            return componentContent.html();
        }
    },

    destroy: function (component, keditor) {
        let id = component.find('.keditor-component-content').attr('id');
        CKEDITOR.instances[id] && CKEDITOR.instances[id].destroy();
    },
};
