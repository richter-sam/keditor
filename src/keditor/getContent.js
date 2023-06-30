import CSS_CLASS from './constants/cssClass';
import getContainerContent from './container/getContainerContent';

export default function (inArray) {
    let self = this;
    let result = [];
    
    if(self.contentAreasWrapper.find('#header').length > 0){
        result.push(self.contentAreasWrapper.find('#header')[0].outerHTML);
    }

    self.contentAreasWrapper.find(`.${CSS_CLASS.CONTENT_AREA_INNER}`).each(function () {
        let html = '';
        $(this).children(`.${CSS_CLASS.CONTAINER}`).each(function () {
            let container = $(this);
            
            html += getContainerContent.call(self, container);
        });
        
        result.push(html);
    });

    if(self.contentAreasWrapper.find('#footer').length > 0){
        result.push(self.contentAreasWrapper.find('#footer')[0].outerHTML);
    }

   
    return inArray ? result : result.join('\n');
};
