AOS.init({duration:700,easing:'ease-out-cubic',once:true,offset:50});

(function(){
  const n=document.getElementById('nav');
  const fn=()=>n.classList.toggle('stuck',window.scrollY>50);
  window.addEventListener('scroll',fn,{passive:true});
  fn();
})();

document.querySelectorAll('#navmenu .nav-link').forEach(l=>{
  l.addEventListener('click',()=>{
    const c=document.getElementById('navmenu');
    if(c.classList.contains('show'))document.querySelector('.navbar-toggler').click();
  });
});

(function(){
  const targets=[
    {id:'c1',target:120,suffix:'+'},
    {id:'c2',target:80,suffix:'+'},
    {id:'c3',target:15,suffix:'+'}
  ];
  let done=false;
  
  const animate=()=>{
    targets.forEach(({id,target,suffix})=>{
      const el=document.getElementById(id);
      if(!el)return;
      let cur=0;
      const step=Math.max(1,Math.ceil(target/60));
      const t=setInterval(()=>{
        cur=Math.min(cur+step,target);
        el.textContent=cur+suffix;
        if(cur>=target)clearInterval(t);
      },24);
    });
  };
  
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting&&!done){
        done=true;
        animate();
        io.disconnect();
      }
    });
  },{threshold:.4});
  
  const s=document.getElementById('contadores');
  if(s)io.observe(s);
})();