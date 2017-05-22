 import { PixelRatio } from 'react-native';

export default class FontSizes{
    static get FONT_TODAY_LOWER_LABELS(){
        if(PixelRatio.get() <=2){
            return 30;
        }
        return 40;
    }
    static get FONT_TODAY_STEPS_LABEL(){
        if(PixelRatio.get() <= 2){
            return 80;
        }
        return 100;
    }
    
}