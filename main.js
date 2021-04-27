const url="https://app.livecolonies.com/graphql",loadMore=(a,e,i,c="block")=>{const p=a.length;a=Array.from(a),a.forEach(m=>{m.style.display="none",m.style.opacity=0}),p<e&&(i.style.display="none"),a.slice(0,e).forEach(m=>{m.style.display=c,m.style.opacity=1}),i.addEventListener("click",m=>{m.preventDefault();const t=a.filter(o=>o.style.display===c).length;a.slice(t-1,a.length).forEach(o=>{o.style.display=c,o.style.opacity=1,o.style.transition="opacity 3s ease-in-out"}),a.filter(o=>o.style.display===c).length>=p&&(i.style.display="none")})},queryFetch=async(a,e)=>await(await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:a,variables:e})})).json(),removeDecimalsFromPrice=a=>a.split(".")[1]==="00"?a.split(".")[0].replace(".",""):a,mapStyled=[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#00426a"},{saturation:"-75"},{lightness:"30"}]},{featureType:"landscape",elementType:"labels.text.fill",stylers:[{color:"#00426a"},{saturation:"-27"},{lightness:"22"}]},{featureType:"landscape.man_made",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape.natural",elementType:"geometry.fill",stylers:[{color:"#0076a8"},{lightness:"90"},{saturation:"-80"},{gamma:"1.00"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{weight:"0.01"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#00426a"},{lightness:"47"},{saturation:"-75"}]},{featureType:"road",elementType:"labels.icon",stylers:[{weight:"0.01"},{lightness:"36"},{saturation:"-59"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#0076a8"},{weight:"1.00"},{lightness:"45"},{saturation:"-67"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{saturation:"-62"},{visibility:"simplified"},{gamma:"0.66"},{hue:"#0075ff"},{lightness:"17"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#0076a8"},{lightness:"63"},{saturation:"-76"},{weight:"2"}]},{featureType:"road.local",elementType:"all",stylers:[{visibility:"simplified"},{color:"#0076a8"},{lightness:"66"},{saturation:"-81"}]},{featureType:"transit.station",elementType:"geometry.fill",stylers:[{color:"#0076a8"},{lightness:"70"},{saturation:"-78"}]},{featureType:"transit.station",elementType:"geometry.stroke",stylers:[{lightness:"50"}]},{featureType:"transit.station",elementType:"labels.text",stylers:[{saturation:"-47"}]},{featureType:"water",elementType:"all",stylers:[{color:"#0076a8"},{visibility:"on"},{lightness:"58"},{saturation:"-44"},{gamma:"0.87"}]}],getResidencesByCity=async(a,e)=>{const i=`query Residences($city: String, $locale: Locale) {
    residences(city: $city, locale: $locale) {
      id
      address {
        city
      }
      coliving
      latitude
      longitude
      minPrice
      name
      numberOfHousingUnits
      primaryPhotoUrl
      size
      vacancies
    }
  }
  `,c=document.querySelector(".city-rooms #residence-grid"),p=document.querySelector(".city-studios #residence-grid"),m=await queryFetch(i,{city:a,locale:e}),{data:{residences:t}}=m;if(t.length===0){const l=new URL(window.location.href);window.location.href=`${l.origin}/notfound`}t.sort((l,g)=>l.vacancies<g.vacancies?1:-1).map(l=>{const g=l.coliving?"single-house":"studio",n=document.querySelector(".residence-city-mock").cloneNode(!0);n.classList.remove("residence-city-mock"),n.classList.add("residence-city-block"),n.setAttribute("href",`${g}?id=${l.id}&city=${a}`),n.querySelector(".residence-city-name").textContent=l.name,n.querySelector(".residence-city-city").textContent=l.address.city,n.querySelector(".residence-city-area").textContent=l.size,n.querySelector(".residence-city-photo").setAttribute("srcset",l.primaryPhotoUrl),n.querySelector(".residence-city-photo").setAttribute("alt",l.name),n.querySelector(".residence-city-hover-name").innerHTML=`&nbsp; ${l.name}`,n.querySelector(".residence-city-discover").textContent=e==="FR"?"D\xE9couvrir":"Discover",l.coliving===!0&&(n.querySelector(".residence-city-room").textContent=l.numberOfHousingUnits),n.querySelector(".residence-city-price").textContent=removeDecimalsFromPrice(l.minPrice.replace("\u20AC","")),n.querySelector(".cities-block-badge").textContent=l.vacancies?e==="FR"?"Disponible":"Available":e==="FR"?"Sur liste d'attente":"On waiting list",n.querySelector(".cities-block-badge").classList.remove("badge-available"),n.querySelector(".cities-block-badge").classList.add(l.vacancies?"badge-available":"badge-occupied"),l.coliving===!0&&c.appendChild(n),l.coliving===!1&&p.appendChild(n)}),document.querySelector(".residence-city-rooms-number").textContent=t.filter(l=>l.coliving===!0).length,p&&(document.querySelector(".residence-city-studios-number").textContent=t.filter(l=>l.coliving===!1).length,loadMore(document.querySelectorAll(".city-studios .residence-city-block"),4,document.querySelector(".residence-city-studios-loadmore"))),loadMore(document.querySelectorAll(".city-rooms #residence-grid .residence-city-block"),4,document.querySelector(".residence-city-rooms-loadmore")),document.querySelectorAll(".residence-city-mock").forEach(l=>l.remove()),document.querySelectorAll(".city-pair").forEach(l=>l.remove()),document.querySelectorAll(".city-studios .city-icon-rooms").forEach(l=>l.remove());const y="https://uploads-ssl.webflow.com/603fd7f75447dd2fb0cab4e8/60468e47edb8e4eec4010c08_city-map-pin.svg",o=document.querySelector(".city-popin");(()=>{const l=n=>{if(n==="Paris")return{lat:48.856613,lng:2.352222};if(n==="Lille")return{lat:50.62925,lng:3.057256};if(n==="Marseille")return{lat:43.296482,lng:5.36978};if(n==="Berlin")return{lat:52.520008,lng:13.404954}},g=new google.maps.Map(document.querySelector("#map"),{zoom:11,center:new google.maps.LatLng(l(a)),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:mapStyled}),d=[];google.maps.event.addListener(g,"click",()=>{d.forEach(n=>n.close())}),t.forEach(n=>{const w=n.coliving?"single-house":"studio",h=o.cloneNode(!0);h.querySelector(".city-link-block").setAttribute("href",`${w}?id=${n.id}&city=${a||"Paris"}`),h.querySelector("img").setAttribute("srcset",n.primaryPhotoUrl),h.querySelector(".h2").textContent=n.name,h.querySelector(".pin-price").textContent=removeDecimalsFromPrice(n.minPrice.replace("\u20AC","")),h.querySelector(".pin-room").textContent=n.numberOfHousingUnits,h.querySelector(".city-city").textContent=n.address.city,h.querySelector(".pin-area").textContent=n.size;const S=new google.maps.Marker({position:{lat:n.latitude,lng:n.longitude},map:g,icon:y,draggarble:!1});google.maps.event.addListener(S,"click",()=>{d.forEach(C=>C.close());const f=new google.maps.InfoWindow;d.push(f),f.setContent(h.innerHTML),f.open(g,S)})})})(),document.querySelector(".loader").style.transition="opacity 0.5s ease",document.querySelector(".loader").style.opacity="0",setTimeout(()=>{document.querySelector(".loader").remove()},500)};class Lightbox{static init(e,i){e.addEventListener("click",c=>{c.preventDefault(),new Lightbox(i)})}constructor(e){this.images=e,this.element=this.buildDOM(e[0]),this.loadImage(e[0]),this.onKeyUp=this.onKeyUp.bind(this),document.body.appendChild(this.element),document.addEventListener("keyup",this.onKeyUp)}loadImage(e){this.url=null;const i=new Image,c=this.element.querySelector(".lightbox__container"),p=document.createElement("div");p.classList.add("lightbox__loader"),c.innerHTML="",c.appendChild(p),i.onload=()=>{c.removeChild(p),c.appendChild(i),this.url=e},i.src=e}close(e){e.preventDefault(),this.element.classList.add("fadeOut"),window.setTimeout(()=>{this.element.remove()},500),document.removeEventListener("keyup",this.onKeyUp)}onKeyUp(e){e.key==="Escape"&&this.close(e),e.key==="ArrowLeft"&&this.prev(e),e.key==="ArrowRight"&&this.next(e)}prev(e){e.preventDefault();let i=this.images.findIndex(c=>c===this.url);i===0&&(i=this.images.length),this.loadImage(this.images[i-1])}next(e){e.preventDefault();let i=this.images.findIndex(c=>c===this.url);i===this.images.length-1&&(i=-1),this.loadImage(this.images[i+1])}buildDOM(e){const i=document.createElement("div");return i.classList.add("lightbox"),i.innerHTML=`
					<button class="lightbox__close"></button>
					<div class="lightbox__container"></div>
		`,this.images.length>1&&(i.innerHTML+=`
			<button class="lightbox__next"></button>
			<button class="lightbox__prev"></button>
			`,i.querySelector(".lightbox__next").addEventListener("click",this.next.bind(this)),i.querySelector(".lightbox__prev").addEventListener("click",this.prev.bind(this))),i.querySelector(".lightbox__close").addEventListener("click",this.close.bind(this)),i}}class Carousel{constructor(e,i={},c,p){this.element=e,this.nextButton=p,this.prevButton=c,this.options=Object.assign({},{slidesToScroll:1,slidesVisible:1},i);let m=[].slice.call(e.children);this.isMobile=!0,this.currentItem=0,this.root=this.createDivWithClass("carousel"),this.container=this.createDivWithClass("carousel__container"),this.root.appendChild(this.container),this.element.appendChild(this.root),this.items=m.map(t=>{let y=this.createDivWithClass("carousel__item");return y.appendChild(t),this.container.appendChild(y),y}),this.setStyle(),this.createNavigation(),this.onWindowResize(),window.addEventListener("resize",this.onWindowResize.bind(this))}setStyle(){let e=this.items.length/this.slidesVisible;this.container.style.width=e*100+"%",this.items.forEach(i=>i.style.width=100/this.slidesVisible/e+"%")}createNavigation(){this.nextButton.addEventListener("click",this.next.bind(this)),this.prevButton.addEventListener("click",this.prev.bind(this))}next(){this.goToItem(this.currentItem+this.slidesToScroll)}prev(){this.goToItem(this.currentItem-this.slidesToScroll)}goToItem(e){e<0&&(e=this.items.length-1),e>=this.items.length&&(e=0);let i=e*-100/this.items.length;this.container.style.transform=`translate3d(${i}%, 0, 0)`,this.currentItem=e}createDivWithClass(e){const i=document.createElement("div");return i.classList.add(e),i}onWindowResize(){let e=window.innerWidth<=982;e!==this.isMobile&&(this.isMobile=e,this.setStyle())}get slidesToScroll(){return this.isMobile?1:this.options.slidesToScroll}get slidesVisible(){return this.isMobile?1:this.options.slidesVisible}}const getResidencesByCitySingle=async(a,e,i)=>{const p=await queryFetch(`query Residences($city: String, $locale: Locale) {
		residences(city: $city, locale: $locale) {
			id
			address {
				city
				country
				line1
				postalCode
				state
			}
			amenities {
				name
				quantity
				shared
				size
				space
			}
			vacancies
			coliving
			latitude
			longitude
			seoMetaDesc
			seoTitleDesc
			marketingDesc
			marketingPlans
			minPrice
			name
			neighborhoodDesc
			numberOfHousingUnits
			photos
			primaryPhotoUrl
			size
			transportDesc
			virtualTourUrl
		}
	}
	`,{city:e,locale:i}),{data:{residences:m}}=p;if(m.length===0){const r=new URL(window.location.href);window.location.href=`${r.origin}/notfound`}const t=m.find(r=>r.id===a);document.title=t.seoTitleDesc,document.querySelector('meta[property="og:title"]').content=t.seoTitleDesc,document.querySelector('meta[property="twitter:title"]').content=t.seoTitleDesc,document.querySelector('meta[name="description"]').content=t.seoMetaDesc,document.querySelector('meta[property="og:description"]').content=t.seoMetaDesc,document.querySelector('meta[property="twitter:description"]').content=t.seoMetaDesc,document.querySelector('meta[property="og:image"]').content=t.primaryPhotoUrl,document.querySelector('meta[property="twitter:image"]').content=t.primaryPhotoUrl;const y=document.querySelector(".residence-single-hero-card-mock");if(y.querySelector(".residence-single-hero-card-name").textContent=t.name,y.querySelector(".residence-single-hero-card-city").textContent=t.address.city,y.querySelector(".residence-single-hero-card-area").textContent=t.size,y.querySelector(".residence-single-hero-card-room")!==null&&(y.querySelector(".residence-single-hero-card-room").textContent=t.numberOfHousingUnits),y.querySelector(".residence-single-hero-card-price").textContent=removeDecimalsFromPrice(t.minPrice.replace("\u20AC","")),t.coliving===!1&&t.address.country==="DE"){const r=parseInt(t.minPrice.replace("\u20AC","").replace(",",""));y.querySelector("a.cta").setAttribute("href",`https://colonies.typeform.com/to/NHXEjFQ9#residence=${t.name}&availability=${t.vacancies?"no":"yes"}&price=${r}&language=${i}`)}const o=document.querySelectorAll(".residence-single-slide");o[0].querySelector("img").setAttribute("srcset",t.photos[0]),o[1].querySelector("img").setAttribute("srcset",t.photos[1]),o[2].querySelector("img").setAttribute("srcset",t.photos[2]),o[3].querySelector("img").setAttribute("srcset",t.photos[3]),o[4].querySelector("img").setAttribute("srcset",t.photos[4]),o[5].querySelector("img").setAttribute("srcset",t.photos[5]);const b=document.querySelector(".residence-single-equipement-grid");t.amenities.map(r=>{const u=document.querySelector(".single-house-equipement").cloneNode(!1);u.classList.remove("residence-single-equipement"),u.textContent=r.name,b.appendChild(u)}),document.querySelectorAll(".residence-single-equipement").forEach(r=>r.remove()),document.querySelector(".residence-single-photo-name").textContent=t.name,document.querySelector(".residence-single-gallery-number").textContent=`+${t.photos.length-6}`,t.photos.map((r,s)=>{const u=document.querySelector(`.residence-single-galerie-img-${s}`),v=document.querySelector(`.residence-single-slider-img-${s}`);v&&v.querySelector(".img-100pc-100pc").setAttribute("srcset",r),u&&u.querySelector(".img-100pc-100pc").setAttribute("srcset",r)});const l=document.querySelector(".residence-single-gallery-lightbox");Lightbox.init(l,t.photos),t.virtualTourUrl?(document.querySelector(".single-house-virtual-tour-img").setAttribute("srcset",t.primaryPhotoUrl),document.querySelector(".single-house-virtualtour").addEventListener("click",r=>{r.preventDefault();const s=document.createElement("iframe");s.setAttribute("src",t.virtualTourUrl),s.setAttribute("frameborder","0"),s.width="100%",s.height="100%",s.className="single-house-photo-hover-layer virtual-tour",r.target.innerHTML="",r.target.appendChild(s)})):(document.querySelector(".virtualtour-menu").remove(),document.querySelector(".section.single-house-virtual-tour").remove()),document.querySelector(".residence-single-description-image").setAttribute("srcset",t.primaryPhotoUrl);const g=document.querySelector(".residence-single-description-richtext");g.innerHTML=t.marketingDesc,document.querySelector(".residence-single-address").textContent=`${t.address.line1}, ${t.address.postalCode} ${t.address.city}`,e==="Berlin"&&document.querySelector(".residence-single-address").remove();const d="https://uploads-ssl.webflow.com/603fd7f75447dd2fb0cab4e8/60468e47edb8e4eec4010c08_city-map-pin.svg";(()=>{const r=new google.maps.Map(document.querySelector("#map"),{zoom:16,center:new google.maps.LatLng(t.latitude,t.longitude),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:mapStyled}),s=new google.maps.Marker({position:{lat:t.latitude,lng:t.longitude},map:r,icon:d,draggarble:!1})})();const w=document.querySelector(".residence-single-alentours-richtext");w.innerHTML=t.neighborhoodDesc;const h=document.querySelector(".residence-single-transport-richtext");h.innerHTML=t.transportDesc;const S=document.querySelector(".hidden-from-landscape .city-link-block.white"),f=window.innerWidth>768?document.querySelector("#button-left-residences"):document.querySelector("#button-left-residences-m"),C=window.innerWidth>768?document.querySelector("#button-right-residences"):document.querySelector("#button-right-residences-m"),T=document.querySelector("#carousel"),q=m.filter(r=>r!=t).filter(r=>t.coliving===!0?r.coliving:!r.coliving).sort((r,s)=>r.vacancies<s.vacancies?1:-1).map(r=>{const s=r.coliving?"single-house":"studio",u=S.cloneNode(!0);u.style.marginRight="32px",u.setAttribute("href",`${s}?id=${r.id}&city=${e}`),u.querySelector("img").setAttribute("srcset",r.primaryPhotoUrl),u.querySelector(".residence-other-name").textContent=r.name,u.querySelector(".residence-other-price").textContent=removeDecimalsFromPrice(r.minPrice.replace("\u20AC","")),u.querySelector(".residence-other-city").textContent=r.address.city,r.coliving===!0&&u.querySelector(".residence-other-room")!==void 0&&(u.querySelector(".residence-other-room").textContent=r.numberOfHousingUnits),u.querySelector(".residence-other-area").textContent=r.size,u.querySelector(".cities-block-badge").textContent=r.vacancies?i==="FR"?"Disponible":"Available":i==="FR"?"Sur liste d'attente":"On waiting list",u.querySelector(".cities-block-badge").classList.remove("badge-available"),u.querySelector(".cities-block-badge").classList.add(r.vacancies?"badge-available":"badge-occupied"),T.appendChild(u)});return new Carousel(T,{slidesToScroll:2,slidesVisible:2},f,C),document.querySelectorAll(".slider-mock").forEach(r=>r.remove()),q.length===0&&document.querySelector(".section.single-house-autres-residences").remove(),t},getRoomsByResidenceId=async(a,e,i)=>{const c=await i,m=await queryFetch(`query HousingUnits($residenceId: ID!, $locale: Locale) {
		housingUnits(residenceId: $residenceId, locale: $locale) {
			amenities {
				name
				quantity
				shared
				size
				space
			}
			floor
			marketingDesc
			maxCapacity
			photos
			price
			size
			status
			unitNumber
			unitType
		}
	}
`,{residenceId:a,locale:e}),{data:{housingUnits:t}}=m,y=document.querySelector(".residence-single-room-grid");t.sort((o,b)=>o.status>b.status?1:-1).filter(o=>o.status!=="unavailable").map((o,b)=>{const l=document.querySelector(".residence-single-room-mock-odd"),g=document.querySelector(".residence-single-room-mock-even"),d=b%2==0?l.cloneNode(!0):g.cloneNode(!0);if(d.querySelector(".available").className=o.status==="occupied"?"occupied":"available",d.querySelector(".residence-single-room-status").textContent=o.status==="occupied"?e==="FR"?"Occup\xE9":"Occupied":e==="FR"?"Disponible":"Available",d.querySelector(".residence-single-room-name").textContent=`${o.unitType} n\xB0${o.unitNumber}`,d.querySelector(".residence-single-room-capacity").textContent=o.maxCapacity,d.querySelector(".residence-single-room-area").textContent=o.size,d.querySelector(".residence-single-room-floor").textContent=o.floor,d.querySelector(".residence-single-room-price").textContent=removeDecimalsFromPrice(o.price.replace("\u20AC","")),d.querySelector(".residence-single-room-description").textContent=o.marketingDesc,d.querySelector(".residence-single-room-slider img").setAttribute("srcset",o.photos[0]),d.classList.remove("residence-single-room-mock-odd"),d.classList.remove("residence-single-room-mock-even"),c.marketingPlans.length===0||c.coliving===!1){const s=d.querySelector(".single-house-icon-plan");s&&s.remove()}else Lightbox.init(d.querySelector(".single-house-icon-plan"),c.marketingPlans);Lightbox.init(d.querySelector(".residence-single-room-slider"),o.photos);const n=d.querySelector(".button");o.status==="occupied"&&(n.textContent=e==="FR"?"Rejoindre la liste d'attente":"Join the waiting list",n.classList.remove("button-available"),n.classList.add("button-occupied"));const w=s=>{if(c.coliving&&s==="FR")return"P9AiLTlp";if(c.coliving&&s==="DE")return"Ec826muF"},h=parseInt(o.price.replace("\u20AC","").replace(",","")),S=new URL(`https://colonies.typeform.com/to/${w(c.address.country)}#residence=${c.name}`),f=new URLSearchParams;f.append("unit",`${o.unitType} ${o.unitNumber}`),f.append("availability",o.status==="occupied"?"no":"yes"),f.append("price",h),f.append("language",e),S.search=f.toString(),n.setAttribute("href",S.href);const C=d.querySelector(".residence-single-room-equipement-grid"),T=d.querySelector(".residence-single-bathroom-equipement-grid"),q=o.amenities.filter(s=>s.space==="Bathroom").map(s=>({name:s.name,shared:s.shared})),r=d.querySelector(".single-house-equipement");q.every(s=>s.shared)||q.every(s=>!s.shared)?r.textContent=e==="FR"?`Douche et toilettes ${q[0].shared?"partag\xE9es":"priv\xE9es"}`:`${q[0].shared?"shared":"private"} shower and toilets`:r.textContent=e==="FR"?`Douche ${q[0].shared?"partag\xE9e":"priv\xE9e"}, Toilettes ${q[1].shared?"partag\xE9es":"priv\xE9es"}`:`${q[0].shared?"shared":"private"} shower, ${q[1].shared?"shared":"private"} toilets`,o.amenities.filter(s=>(s.space==="Room"||s.space==="Kitchen")&&s.shared===!1).sort((s,u)=>s.space<u.space?1:-1).map(s=>{const v=d.querySelector(".single-house-equipement.white").cloneNode(!1);v.classList.remove("residence-single-room-equipement"),v.textContent=s.name,C.appendChild(v)}),d.querySelectorAll(".residence-single-room-equipement").forEach(s=>s.remove()),y.appendChild(d)}),c.coliving&&(document.querySelector(".residence-single-room-number").textContent=c.numberOfHousingUnits),document.querySelectorAll(".residence-single-room-mock-odd").forEach(o=>o.remove()),document.querySelectorAll(".residence-single-room-mock-even").forEach(o=>o.remove()),loadMore(document.querySelectorAll(".residence-single-room-odd, .residence-single-room-even"),4,document.querySelector(".residence-single-loadmore"),"grid"),document.querySelector(".loader").style.transition="opacity 0.5s ease",document.querySelector(".loader").style.opacity="0",setTimeout(()=>{document.querySelector(".loader").remove()},500)};window.getResidencesByCity=getResidencesByCity,window.getResidencesByCitySingle=getResidencesByCitySingle,window.getRoomsByResidenceId=getRoomsByResidenceId;function init(){let a=Weglot.getCurrentLang().toUpperCase();const e=new URLSearchParams(window.location.search).get("id"),i=new URLSearchParams(window.location.search).get("city");if(e&&i&&a){const c=getResidencesByCitySingle(e,i,a);getRoomsByResidenceId(e,a,c)}if(window.city)try{getResidencesByCity(window.city,a)}catch(c){setTimeout(function(){getResidencesByCity(window.city,a)},1e3)}if(a==="EN"){const c=document.querySelector("#w-dropdown-list-0 a");c.href="https://www.livecolonies.com"}}$(document).ready(function(){Weglot.initialized?init():Weglot.on("initialized",function(){init()})});
