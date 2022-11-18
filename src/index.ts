import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";
import Sortable from "sortablejs";

const info = <const>{
  name: "jsPsychSortableImages",
  parameters: {
    images: {
      type: ParameterType.IMAGE,
      array: true // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, KEYS, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
    },
    image_names: {
      type: ParameterType.STRING,
      array: true,
      default: null
    },
    categories: {
      type: ParameterType.STRING,
      array: true,
      default: null
    },
    category_count: {
      type: ParameterType.INT,
      default: null
    },
    require_sorting_all: {
      type: ParameterType.BOOL,
      default: true
    },
    min_per_category: {
      type: ParameterType.INT,
      default: 1
    },
    require_function: {
      type: ParameterType.FUNCTION,
      default: null
    },
    prompt: {
      type: ParameterType.HTML_STRING,
      default: null
    },
    randomize_image_list: {
      type: ParameterType.BOOL,
      default: true
    },
    button_html: {
      type: ParameterType.HTML_STRING,
      default: '<button class="jspsych-btn">Next</button>'
    },
    hide_button: {
      type: ParameterType.BOOL,
      default: true
    },
    disable_button: {
      type: ParameterType.BOOL,
      default: true
    },
    image_max_width: {
      type: ParameterType.INT,
      default: 100
    },
    image_max_height: {
      type: ParameterType.INT,
      default: 100
    },
    list_images_per_row: {
      type: ParameterType.INT,
      default: null
    },
    category_images_per_row: {
      type: ParameterType.INT,
      default: null
    },
    categories_per_row: {
      type: ParameterType.INT,
      default: null
    },
    sortablejs_options: {
      type: ParameterType.OBJECT,
      default: {}
    },
    use_custom_css: {
      type: ParameterType.BOOL,
      default: false
    },
  },
};

type Info = typeof info;

/**
 * 
 * @author Ponrawee Prasertsom
 * @see {@link https://github.com/ponrawee/plugin-sortable-images}
 * 
 */
class SortableImagesPlugin implements JsPsychPlugin<Info> {
  static info = info;

  constructor(private jsPsych: JsPsych) {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {
    if ((
      (trial.category_count === null) && (trial.categories === null)) ||
      ((trial.category_count !== null) && (trial.categories !== null)) 
    ) {
      console.error("jspsych-sortable-images: one (and only one) of `category_count` and `categories` parameters needs to be specified.")
    }
    
    let trialData = {
      response: [],
    }

    let categoryNames = trial.categories
    if (trial.categories === null && trial.category_count !== null) {
      categoryNames = Array.from(Array(trial.category_count).keys()).map((i) => i.toString())
    }
    trialData['category_names'] = categoryNames

    const sortableCategoryId = 'jspsych-sortable-images'

    let imageNames = trial.image_names
    if (imageNames === null) {
      imageNames = trial.images.map((path) => {
        const splitted = path.split('/')
        return splitted[splitted.length - 1] // get the image filename if not given
      })
    }

    if (imageNames.length !== trial.images.length) {
      console.error('jspsych-sortable-images: image_names and images must be of equal length.')
    }

    const render_image_list = () => {
      let html = '<div class="image-list-wrapper"><div class="sorter image-list">'
      let images = trial.images
      if (trial.randomize_image_list) {
        images = this.jsPsych.randomization.shuffle(trial.images)
      }
      for(let i = 0; i < images.length; i++) {
        const image = images[i]
        const imageName = imageNames[i]
        html += '<div class="image image-' + imageName + '" data-image-name="' + imageName + '">'
        html += '<img src="' + image + '">'
        html += '</div>'
      }
      html += '</div></div>'
      return html
    }

    const render_category_list = () => {
      let html = '<div class="category-wrapper">'
      for(const category of categoryNames) {
        let categoryHtml = '<div class="category sorter" id="category-' + category + '" data-category="' + category + '">'
        categoryHtml += '</div>'
        html += categoryHtml
      }
      html += "</div>"
      return html
    }

    const render_button = () => {
      return '<div class="button-wrapper">' + trial.button_html + '</div>'
    }

    const disable_button = () => {
      const submitBtn: HTMLButtonElement = display_element.querySelector('#jspsych-sortable-images .button-wrapper button')
      if (trial.hide_button) {
        submitBtn.classList.add('hidden')
      }
      if (trial.disable_button) {
        submitBtn.disabled = true
      }
    }

    const render_html = () => {
      let html = '<div id="jspsych-sortable-images">'
      if (trial.prompt !== null) {
        html += '<div class="prompt">' + trial.prompt + '</div>'
      }
      html += render_image_list()
      html += render_category_list()
      html += render_button()
      html += '</div>'
      display_element.innerHTML = html
    }

    const style_html = () => {
      const wrapperElement: HTMLElement = document.querySelector('#jspsych-sortable-images')
      const imageListElement: HTMLElement = wrapperElement.querySelector('.image-list')
      const imageElements: NodeList = wrapperElement.querySelectorAll('.image-list .image img')
      const categoryElements: NodeList = wrapperElement.querySelectorAll('.category')
      const categoryWrapperElement: HTMLElement = wrapperElement.querySelector('.category-wrapper')
      const sorterElements = wrapperElement.querySelectorAll('.sorter')

      let listImagesPerRow = trial.list_images_per_row
      if (listImagesPerRow === null) {
        const width = imageListElement.offsetWidth
        listImagesPerRow = Math.floor(width / trial.image_max_width)
      }

      let categoryImagesPerRow = trial.category_images_per_row

      imageListElement.style.gridTemplateColumns = "repeat(" + listImagesPerRow + "," + trial.image_max_width + "px)"


      imageElements.forEach((el: HTMLElement) => {
        el.style.maxWidth = trial.image_max_width + 'px'
        el.style.maxHeight = trial.image_max_height + 'px'
      })

      let categoriesPerRow = trial.categories_per_row
      if (categoriesPerRow === null) {
        categoriesPerRow = Math.min(3, categoryNames.length)
      }
      categoryWrapperElement.style.gridTemplateColumns = 'repeat(' + categoriesPerRow + ', 1fr)'

      categoryElements.forEach((el: HTMLElement) => {
        if (categoryImagesPerRow === null) {
          const width = el.offsetWidth
          categoryImagesPerRow = Math.floor(width / trial.image_max_width)
        } 
        el.style.gridTemplateColumns = "repeat(" + categoryImagesPerRow + "," + trial.image_max_width + "px)"
      })
      
      sorterElements.forEach((el: HTMLElement) => {
        const computedStyle = window.getComputedStyle(el)
        let padding = parseInt(computedStyle.getPropertyValue('padding-top'), 10)
        padding += parseInt(computedStyle.getPropertyValue('padding-bottom'), 10)
        el.style.minHeight = trial.image_max_height + padding + 'px'
      })
    }

    const get_category_data = () => {
      const categoryElements = display_element.querySelectorAll('#jspsych-sortable-images .category')
      let categoryData = []
      categoryElements.forEach((categoryElement) => {
        let currentCategoryMembers = []
        let images = categoryElement.querySelectorAll('.image')
        for(let i = 0; i < images.length; i++) {
          const image = images[i]
          const imageName = image.getAttribute('data-image-name')
          currentCategoryMembers.push(imageName)
        }
        categoryData.push(currentCategoryMembers)
      })
      return categoryData
    }

    const enable_button = () => {
      const submitBtn: HTMLButtonElement = display_element.querySelector('#jspsych-sortable-images .button-wrapper button')
      submitBtn.disabled = false
      submitBtn.classList.remove('hidden')
      submitBtn.addEventListener(
        'click', (e) => {
          const el = e.currentTarget as HTMLButtonElement
          if (el.disabled) {
            return false
          }
          save_categories()
          end_trial()
          return true
        }
      )
    }

    const check_finish = () => {
      let passImageLength = true
      let passMinMembers = true
      let passFunction = true

      if (trial.require_sorting_all !== null) {
      // try to query for images
        const imageListImages = display_element.querySelectorAll('#jspsych-sortable-images .image-list .image')
        if (imageListImages.length !== 0) {
          passImageLength = false
        }
      }

      if (trial.min_per_category !== null) {
        const categoryElements = display_element.querySelectorAll('#jspsych-sortable-images .category')
        for (let i = 0; i < categoryElements.length; i++) {
          const images = categoryElements[i].querySelectorAll('.image')
          if (images.length < trial.min_per_category) {
            passMinMembers = false
            break
          }
        }
      }

      if (trial.require_function !== null) {
        const categoryData = get_category_data()
        passFunction = trial.require_function(categoryData)
      }

      if(passImageLength && passMinMembers && passFunction) {
        enable_button()
      } else {
        disable_button()
      }
    }

    const save_categories = () => {
      const categoryMembers = get_category_data()
      trialData.response = categoryMembers
    }

    const end_trial = () => {
      this.jsPsych.finishTrial(trialData);
    }

    // initialise html
    render_html()
    if (!trial.use_custom_css) {
      style_html()
    }

    // initialise sortables
    const sorters = display_element.querySelectorAll('#jspsych-sortable-images .sorter')
    sorters.forEach((el) => {
      let options = {
        group: sortableCategoryId,
        animation: 100,
        forceFallback: true,
        onStart: function(e) {
          document.body.classList.add('jspsych-sortable-images-grabbing');
        },
        onEnd: function(e) {
          document.body.classList.remove('jspsych-sortable-images-grabbing');
        }
      }
      if(
        trial.require_sorting_all !== null ||
        trial.min_per_category !== null ||
        trial.require_function !== null
      ) {
        options['onSort'] = check_finish
      }
      options = Object.assign(options, trial.sortablejs_options)
      new Sortable(el, options)
    })

    if(
      trial.require_sorting_all === null &&
      trial.min_per_category === null &&
      trial.require_function === null
    ) {
      enable_button()
    } else {
      disable_button()
    }
    
  }
}

export default SortableImagesPlugin;
