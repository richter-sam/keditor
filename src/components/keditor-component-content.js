import $ from 'jquery';
import KEditor from 'keditor';

KEditor.components['content'] = {
    init: function (contentArea, container, component, keditor) {
        let componentContent = component.children('.keditor-component-content');
    },
    
    settingEnabled: true,
    
    settingTitle: 'Beitrag Einstellungen',
    
    initSettingForm: function (form, keditor) {
        let self = this;
        let options = keditor.options;
        

        form.append(
            '<form class="form-horizontal">' +
            '   <div class="form-group">' +
            '       <label for="selectcontentgroup" class="col-sm-12">Beitragsgruppe</label>' +
            '       <div class="col-sm-12">' +
            '           <select id="selectcontentgroup" class="form-control">' +
            '               <option value="">Bitte wählen</option>' +
            '           </select>' +
            '       </div>' +
            '   </div>' +
            '   <div class="form-group">' +
            '       <label for="selectcontent" class="col-sm-12">Beitrag wählen</label>' +
            '       <div class="col-sm-12">' +
            '           <select id="selectcontent" class="form-control">' +
            '           </select>' +
            '       </div>' +
            '   </div>' +
            '</form>'
        );
        
      
        let selectContentGroup = form.find('#selectcontentgroup');
        let selectContent = form.find('#selectcontent');
        
        selectContentGroup.on('change', function () {
            $.ajax({  
                type: "POST",  
                url: "GetContentGroup",  
                data: {contentId: this.value},  
                success: function (data) {  
                    selectContent.empty();
                    for (var i = 0; i < data.length; i++) {  
                        var option = '<option value="' + data[i].ContentEntryId + '">' + data[i].ContentEntryTitle + '</option>';  
                        selectContent.append(option);
                    }  
                }  
            });
        });

        selectContent.on('change', function () {
            $.ajax({  
                type: "POST",  
                url: "GetContentEntry",  
                data: {contentId: this.value},  
                success: function (data) {  
                    var component = keditor.getSettingComponent();
                    let contentContainer = component.find('.keditor-component-content');
                    $(contentContainer).html(data.contentText);
                }  
            });
        });

    },
    
    showSettingForm: function (form, component, keditor) {
        let self = this;
        let selectContentGroups = form.find('#selectcontentgroup');
        $.ajax({  
            type: "GET",  
            url: "GetContentGroups",  
            data: "{}",  
            success: function (data) {  
                selectContentGroups.empty();
                for (var i = 0; i < data.length; i++) {  
                    var option = '<option value="' + data[i].ContentGroupId + '">' + data[i].ContentGroupName + '</option>';  
                    selectContentGroups.append(option);
                }  
            }  
        });
    }
};
