import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";
declare const info: {
    readonly name: "jsPsychSortableImages";
    readonly parameters: {
        readonly images: {
            readonly type: ParameterType.IMAGE;
            readonly array: true;
        };
        readonly image_names: {
            readonly type: ParameterType.STRING;
            readonly array: true;
            readonly default: any;
        };
        readonly categories: {
            readonly type: ParameterType.STRING;
            readonly array: true;
            readonly default: any;
        };
        readonly category_count: {
            readonly type: ParameterType.INT;
            readonly default: any;
        };
        readonly require_sorting_all: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        readonly min_per_category: {
            readonly type: ParameterType.INT;
            readonly default: 1;
        };
        readonly require_function: {
            readonly type: ParameterType.FUNCTION;
            readonly default: any;
        };
        readonly prompt: {
            readonly type: ParameterType.HTML_STRING;
            readonly default: any;
        };
        readonly randomize_image_list: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        readonly button_html: {
            readonly type: ParameterType.HTML_STRING;
            readonly default: "<button class=\"jspsych-btn\">Next</button>";
        };
        readonly hide_button: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        readonly disable_button: {
            readonly type: ParameterType.BOOL;
            readonly default: true;
        };
        readonly image_max_width: {
            readonly type: ParameterType.INT;
            readonly default: 100;
        };
        readonly image_max_height: {
            readonly type: ParameterType.INT;
            readonly default: 100;
        };
        readonly list_images_per_row: {
            readonly type: ParameterType.INT;
            readonly default: any;
        };
        readonly category_images_per_row: {
            readonly type: ParameterType.INT;
            readonly default: any;
        };
        readonly categories_per_row: {
            readonly type: ParameterType.INT;
            readonly default: any;
        };
        readonly sortablejs_options: {
            readonly type: ParameterType.OBJECT;
            readonly default: {};
        };
        readonly use_custom_css: {
            readonly type: ParameterType.BOOL;
            readonly default: false;
        };
    };
};
declare type Info = typeof info;
/**
 *
 * @author Ponrawee Prasertsom
 * @see {@link https://github.com/ponrawee/plugin-sortable-images}
 *
 */
declare class SortableImagesPlugin implements JsPsychPlugin<Info> {
    private jsPsych;
    static info: {
        readonly name: "jsPsychSortableImages";
        readonly parameters: {
            readonly images: {
                readonly type: ParameterType.IMAGE;
                readonly array: true;
            };
            readonly image_names: {
                readonly type: ParameterType.STRING;
                readonly array: true;
                readonly default: any;
            };
            readonly categories: {
                readonly type: ParameterType.STRING;
                readonly array: true;
                readonly default: any;
            };
            readonly category_count: {
                readonly type: ParameterType.INT;
                readonly default: any;
            };
            readonly require_sorting_all: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            readonly min_per_category: {
                readonly type: ParameterType.INT;
                readonly default: 1;
            };
            readonly require_function: {
                readonly type: ParameterType.FUNCTION;
                readonly default: any;
            };
            readonly prompt: {
                readonly type: ParameterType.HTML_STRING;
                readonly default: any;
            };
            readonly randomize_image_list: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            readonly button_html: {
                readonly type: ParameterType.HTML_STRING;
                readonly default: "<button class=\"jspsych-btn\">Next</button>";
            };
            readonly hide_button: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            readonly disable_button: {
                readonly type: ParameterType.BOOL;
                readonly default: true;
            };
            readonly image_max_width: {
                readonly type: ParameterType.INT;
                readonly default: 100;
            };
            readonly image_max_height: {
                readonly type: ParameterType.INT;
                readonly default: 100;
            };
            readonly list_images_per_row: {
                readonly type: ParameterType.INT;
                readonly default: any;
            };
            readonly category_images_per_row: {
                readonly type: ParameterType.INT;
                readonly default: any;
            };
            readonly categories_per_row: {
                readonly type: ParameterType.INT;
                readonly default: any;
            };
            readonly sortablejs_options: {
                readonly type: ParameterType.OBJECT;
                readonly default: {};
            };
            readonly use_custom_css: {
                readonly type: ParameterType.BOOL;
                readonly default: false;
            };
        };
    };
    constructor(jsPsych: JsPsych);
    trial(display_element: HTMLElement, trial: TrialType<Info>): void;
}
export default SortableImagesPlugin;
