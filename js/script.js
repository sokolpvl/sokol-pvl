class Me {
   constructor(type) {
      this.typeMedia = type
   }
   init() {
      this.elements = document.querySelectorAll('[data-me]')
      this.objects = []

      if (this.elements.length > 0) {
         for (let index = 0; index < this.elements.length; index++) {
            const meElement = this.elements[index];

            const obj = {}
            obj.el = meElement
            const dataAttr = meElement.dataset.me.split(',').map(item => item.trim())
            obj.dataAttr = {
               size: dataAttr[0],
               block: dataAttr[1],
               index: dataAttr[2],
            }
            obj.parentElement = obj.el.parentElement
            obj.indexParent = Array.from(obj.parentElement.children).indexOf(obj.el)
            this.objects.push(obj)
         }
         for (let index = 0; index < this.objects.length; index++) {
            const obj = this.objects[index];
            const mediaQueryList = window.matchMedia(`(${this.typeMedia}-width:${obj.dataAttr.size}px)`)
            this.mediaHandler(mediaQueryList, obj)
            mediaQueryList.addEventListener('change', e => this.mediaHandler(e, obj))
         }
      }
   }
   mediaHandler(e, obj) {
      if (e.matches) {
         obj.el.classList.add('-me')
         this.moveTo(obj.el, obj.dataAttr.block, obj.dataAttr.index)
      } else {
         obj.el.classList.remove('-me')
         this.moveBack(obj.el, obj.parentElement, obj.indexParent)
      }
   }
   moveTo(element, block, index) {
      if (document.querySelector(block)) {
         const toBlock = document.querySelector(block)
         const blockChildren = toBlock.children
         const indexBlock = index == 'first' ? 0 :
            index == 'last' ? undefined :
               index;

         if (blockChildren[indexBlock] != undefined) {
            blockChildren[indexBlock].insertAdjacentElement(
               'beforebegin',
               element
            )
         } else {
            toBlock.insertAdjacentElement(
               'beforeend',
               element
            )
         }
      }
   }
   moveBack(element, parentElement, index) {
      const blockChildren = parentElement.children

      if (blockChildren[index] != undefined) {
         blockChildren[index].insertAdjacentElement(
            'beforebegin',
            element
         )
      } else {
         parentElement.insertAdjacentElement(
            'beforeend',
            element
         )
      }
   }
}
const me = new Me('max')
me.init()
// document.addEventListener('click', actionDocument)
// function actionDocument(e) {
//    const target = e.target;
// }
lightGallery(document.querySelector('.works__grid'), {
   selector: '.item-works__hover',
   zoom: true
});
var map;
DG.then(function () {
   const latlng = [52.2980494,76.9691423]
   map = DG.map('location-map', {
      center: latlng,
      zoom: 18,
   });

   DG.marker(latlng).addTo(map)
});