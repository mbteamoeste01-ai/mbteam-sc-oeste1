(() => {
 const cfg=window.MBTEAM_CONFIG||{};
 const slides=[...document.querySelectorAll(".gallery-slide")];
 const dots=document.querySelector("#galleryDots");
 const counter=document.querySelector("#galleryCounter");
 let current=0,timer;
 const year=document.querySelector("#year");
 if(year) year.textContent=new Date().getFullYear();
 function show(i,reset=false){
   if(!slides.length) return;
   current=(i+slides.length)%slides.length;
   slides.forEach((s,n)=>{s.classList.toggle("active",n===current);s.setAttribute("aria-hidden",n===current?"false":"true")});
   if(dots) [...dots.children].forEach((d,n)=>{d.classList.toggle("active",n===current);d.setAttribute("aria-current",n===current?"true":"false")});
   if(counter) counter.textContent=`${String(current+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;
   if(reset) restart();
 }
 function restart(){clearInterval(timer);timer=setInterval(()=>show(current+1),5000)}
 if(dots){
   dots.innerHTML="";
   slides.forEach((_,i)=>{const b=document.createElement("button");b.type="button";b.setAttribute("aria-label",`Mostrar foto ${i+1}`);b.addEventListener("click",()=>show(i,true));dots.appendChild(b)});
 }
 const prev=document.querySelector("#prevSlide"), next=document.querySelector("#nextSlide");
 if(prev) prev.addEventListener("click",()=>show(current-1,true));
 if(next) next.addEventListener("click",()=>show(current+1,true));
 show(0); if(slides.length>1) restart();
 const number=String(cfg.whatsappNumber||"").replace(/\D/g,"");
 document.querySelectorAll(".whatsapp-link").forEach(a=>{
   if(number){a.href=`https://wa.me/${number}?text=${encodeURIComponent("Olá! Gostaria de agendar uma aula experimental gratuita na MB Team SC Oeste1. Quais horários estão disponíveis?")}`}
   else{a.href="#contato-pendente";a.addEventListener("click",e=>{e.preventDefault();alert("O WhatsApp da academia ainda precisa ser configurado no arquivo config.js antes de publicar o site.")})}
 });
})();