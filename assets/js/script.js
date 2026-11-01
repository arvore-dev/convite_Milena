(function(){
  var COIN='assets/img/moeda.png';document.getElementById('cimg').src=COIN;
  var aud=document.getElementById('aud'),coins=0,n=document.getElementById('n'),env=document.getElementById('env'),inv=document.getElementById('inv'),msg=document.getElementById('msg');
  function pop(x,y,t){var e=document.createElement('div');e.className='pop';e.innerHTML=t;e.style.left=(x-20)+'px';e.style.top=(y-20)+'px';document.body.appendChild(e);setTimeout(function(){e.remove()},950)}
  function add(x,y){coins++;n.textContent=coins;pop(x,y,'+1 <img class="cn" src="'+COIN+'" alt="">')}
  function confetti(){var c=['#f06aa6','#f7c531','#3b8fd9','#5cb85c','#fff'];for(var i=0;i<60;i++){var e=document.createElement('i');e.className='conf';e.style.left=Math.random()*100+'vw';e.style.background=c[i%5];e.style.animationDuration=(2+Math.random()*2)+'s';e.style.animationDelay=(Math.random()*.5)+'s';document.body.appendChild(e);setTimeout(function(el){el.remove()},4800,e)}}
  var opened=false,started=false;aud.addEventListener('playing',function(){var s=document.getElementById('snd');if(s)s.style.display='none'});try{navigator.audioSession.type='playback'}catch(q){}
  function startAudio(){
    if(started||opened)return;
    try{var p=aud.play();if(p&&p.then){p.then(function(){started=true;off()},function(){})}else{started=true;off()}}catch(q){}
  }
  var evs=['pointerdown','touchstart','mousedown','click','touchend','keydown'];
  function off(){evs.forEach(function(t){document.removeEventListener(t,startAudio,true)})}
  evs.forEach(function(t){document.addEventListener(t,startAudio,true)});
  var ys=document.getElementById('yoshi');
  function yo(){try{ys.currentTime=0;var p=ys.play();if(p&&p.catch)p.catch(function(){})}catch(q){}}
  ['.ch','.step button','#yes','a.btn.alt'].forEach(function(s){document.querySelectorAll(s).forEach(function(el){el.addEventListener('click',yo)})});
  var gate=document.getElementById('gate');
  gate.addEventListener('click',function(){startAudio();gate.classList.add('out');setTimeout(function(){gate.style.display='none'},550)});
  startAudio();aud.addEventListener('canplaythrough',startAudio);window.addEventListener('load',startAudio);window.addEventListener('pageshow',startAudio);
  var aft=document.getElementById('after');
  var actx=null,abuf=null;
  try{
    var AC=window.AudioContext||window.webkitAudioContext;actx=new AC();
    var raw=atob(aft.getAttribute('src').split(',')[1]),ab=new Uint8Array(raw.length);
    for(var k=0;k<raw.length;k++)ab[k]=raw.charCodeAt(k);
    var dp=actx.decodeAudioData(ab.buffer,function(b){abuf=b},function(){});
    if(dp&&dp.then)dp.then(function(b){abuf=b},function(){});
  }catch(q){}
  function unlockAfter(){try{if(actx&&actx.state!=='running')actx.resume()}catch(q){}}
  function playAfter(){
    function go(){
      try{
        if(actx&&abuf){if(actx.state!=='running')actx.resume();var s=actx.createBufferSource();s.buffer=abuf;s.connect(actx.destination);s.start(0);return}
      }catch(q){}
      try{aft.muted=false;aft.currentTime=0;var p=aft.play();if(p&&p.catch)p.catch(function(){})}catch(q){}
    }
    var c=document.getElementById('crown');
    if(c&&!c.paused&&!c.ended){c.addEventListener('ended',go,{once:true})}else{go()}
  }
  function openLetter(x,y){
    if(opened)return;opened=true;try{aud.pause()}catch(q){}
    env.classList.add('open');add(x,y);
    setTimeout(function(){env.classList.add('gone')},900);
    setTimeout(function(){env.style.display='none';inv.classList.add('show');document.getElementById('sub').textContent='Fase desbloqueada!';confetti();playAfter()},1350);
  }
  env.addEventListener('click',function(e){
    var first=!opened;if(first)unlockAfter();openLetter(e.clientX,e.clientY);
    if(first){try{var c=document.getElementById('crown'),pp=c.play();if(pp&&pp.catch)pp.catch(function(){})}catch(q){}}
  });
  document.querySelectorAll('.blk').forEach(function(b){
    b.addEventListener('click',function(e){
      if(b.classList.contains('flip'))return;
      b.classList.add('flip');try{var c=document.getElementById('coin');c.currentTime=0;var pp=c.play();if(pp&&pp.catch)pp.catch(function(){})}catch(x){}add(e.clientX||innerWidth/2,e.clientY||innerHeight/2);msg.textContent=b.dataset.m;
      if(document.querySelectorAll('.blk.flip').length===3){setTimeout(function(){msg.textContent='Fase completa! Agora confirme sua presença.';confetti()},600)}
    });
  });
  var WA="5531999651508";
  var yes=document.getElementById('yes'),rs=document.getElementById('rsvp'),v={ad:1,cr:0};
  yes.addEventListener('click',function(){rs.classList.toggle('show');if(rs.classList.contains('show'))document.getElementById('nm').focus()});
  rs.querySelectorAll('.step button').forEach(function(b){b.addEventListener('click',function(){var t=b.dataset.t;v[t]=Math.max(t==='ad'?1:0,Math.min(20,v[t]+Number(b.dataset.d)));document.getElementById(t).textContent=v[t]})});
  var snd=document.getElementById('send'),prev=document.getElementById('prev');
  function msgText(){var nm=document.getElementById('nm').value.trim()||'(seu nome)',ag=document.getElementById('ages').value.trim();
    return 'Oi! Aqui é '+nm+'. Confirmo presença no aniversário de 7 anos da Milena (20/11, 20h, Le poê).\nAdultos: '+v.ad+'\nCrianças: '+v.cr+(v.cr>0?'\nIdade das crianças: '+(ag||'(informe a idade)'):'')}
  function sync(){var t=msgText();snd.href='https://wa.me/'+WA+'?text='+encodeURIComponent(t);prev.textContent=t}
  rs.addEventListener('input',sync);rs.addEventListener('click',function(){setTimeout(sync,0)});sync();
  snd.addEventListener('click',function(e){
    var er=document.getElementById('err');sync();
    if(!document.getElementById('nm').value.trim()){e.preventDefault();er.textContent='Escreva seu nome para confirmar.';return}
    if(v.cr>0&&!document.getElementById('ages').value.trim()){e.preventDefault();er.textContent='Informe a idade das crianças.';return}
    er.textContent='';add(e.clientX,e.clientY);confetti();
    try{var vv=document.getElementById('vit');vv.currentTime=0;var vp=vv.play();if(vp&&vp.catch)vp.catch(function(){})}catch(q){}
  });
  document.getElementById('cp').addEventListener('click',function(){
    var b=this,t=msgText();
    function ok(){b.textContent='Mensagem copiada!'}
    try{navigator.clipboard.writeText(t).then(ok,function(){sel()})}catch(x){sel()}
    function sel(){var r=document.createRange();r.selectNodeContents(prev);var s=getSelection();s.removeAllRanges();s.addRange(r);try{document.execCommand('copy');ok()}catch(y){b.textContent='Selecione e copie o texto acima'}}
  });
  document.querySelectorAll('.ch').forEach(function(c){c.addEventListener('click',function(e){c.classList.add('hop');setTimeout(function(){c.classList.remove('hop')},350);add(e.clientX,e.clientY)})});
})();
