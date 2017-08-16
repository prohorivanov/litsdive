const Url = require('url')

const wysiwygPlugins = [
  'link',
  'image',
  'code',
  'autolink',
  'textpattern',
  'textcolor',
  'colorpicker',
  'insertdatetime',
  'preview',
  'lists',
  'fullscreen',
  'paste',
  // 'anchor',
  // 'codesample',
  'importcss'
].join(' ')

const style_formats = [
  {
    title: 'H',
    items: [
      {title: 'h3', block: 'h3'},
      {title: 'h4', block: 'h4'}
    ]
  },
  {
    title: 'Blocks',
    items: [
      {title: 'p', block: 'p'},
      {title: 'div', block: 'div'},
      {title: 'pre', block: 'pre'}
    ]
  }
]

exports.wysiwygConf = {
  plugins: wysiwygPlugins,
  menubar: false,
  toolbar: [
    'bold italic backcolor forecolor fontsizeselect',
    'alignleft aligncenter alignright',
    'bullist numlist',
    'link image media editimage',
    'blockquote pastetext preview',
    'code'
  ].join(' | '),
  fontsize_formats: '12pt 14pt 18pt 24pt 36pt',
  block_formats: 'P=p;h1=h1;h2=h2;h3=h3',
  toolbar_items_size: 'small',
  formats: {
    bold: {inline: 'b'},
    italic: {inline: 'i'}
  },
  setup: function (editor) {
    editor.on('init', () => {
      const body = editor.getDoc().body
      body.style.fontSize = '16px'
      body.style.fontFamily = 'tahoma'
    })
    editor.on('change', (evt) => {
      editor.save()
    })
  },
  relative_urls: false,
  convert_urls: false,
  schema: 'html5',
  force_br_newlines: true,
  extended_valid_elements: 'iframe[src|frameborder|style|scrolling|class|width|height|name|align],-p',
  media_live_embeds: true,
  fix_list_elements: true,
  paste_data_images: true,
  paste_as_text: false,
  /**
   * @todo хоть у нас и установлен плагин link, при копипасте ссылка не сразу образется
   * @todo определяем функцию paste_postprocess для конверта ссылок
   * @param pl
   * @param o
   */
  paste_postprocess: function (pl, o) {
    const urlParse = Url.parse(o.node.innerHTML, true)
    if (urlParse.protocol || urlParse.host) {
      o.node.innerHTML = `<a href='${o.node.innerHTML}'>${o.node.innerHTML}</a>`
    }
  },
  automatic_uploads: true,
  images_upload_credentials: true,
  imagetools_toolbar: false,
  object_resizing: false,
  media_poster: false,
  importcss_append: true,
  media_dimensions: false,
  image_description: false,
  allow_conditional_comments: false,
  convert_fonts_to_spans: true,
  image_dimensions: false,
  image_title: false,
  table_grid: false,
  height: 400,
  max_height: 600,
  min_height: 300,
  plugin_preview_height: 700,
  plugin_preview_width: 600,
  skin: 'lightgray',
  theme: 'modern'
}
