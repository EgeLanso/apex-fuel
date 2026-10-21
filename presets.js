// Takım hazır ayarları (Supabase). Herkes okur, sadece admin kaydeder/siler.
const SB_URL='https://supsixtnyprkyfaemabk.supabase.co', SB_KEY='sb_publishable_Mb7kpEFCsWCGKkq-rWAsXQ_VElbSil0';
const $=id=>document.getElementById(id);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let sb=null, presets=[], failed=false, isAdmin=false;
try{ const m=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'); sb=m.createClient(SB_URL,SB_KEY); }catch(e){ console.warn('Supabase yüklenemedi',e); failed=true; }

function summary(d){ return [d.game,d.track,d.car].filter(Boolean).map(esc).join(' · ') }
function render(){
  const box=$('teamPresetList');
  if(failed||!sb){ box.innerHTML=`<div class="empty-profiles">${esc(t('presetsFail'))}</div>`; return }
  box.innerHTML=presets.length?presets.map(p=>`<article class="profile-card"><h3>${esc(p.name)}</h3><p>${summary(p.data||{})}</p><div class="profile-actions"><button class="btn btn-outline" data-load="${esc(p.id)}">${esc(t('loadPreset'))}</button>${isAdmin?`<button class="btn btn-secondary" data-del="${esc(p.id)}">${esc(t('deletePreset'))}</button>`:''}</div></article>`).join(''):`<div class="empty-profiles">${esc(t('noTeamPresets'))}</div>`;
}
function applyUi(){
  document.querySelectorAll('[data-ph]').forEach(e=>e.placeholder=t(e.dataset.ph));
  $('admOut').classList.toggle('hidden',isAdmin); $('admIn').classList.toggle('hidden',!isAdmin);
  $('admToggle').hidden=!sb;
}
async function load(){
  if(!sb)return;
  const {data,error}=await sb.from('fuel_presets').select('*').order('created_at',{ascending:false});
  if(error){console.warn(error);failed=true}else{failed=false;presets=data||[]}
  render();
}
async function check(){
  isAdmin=false;
  if(sb){const {data:{session}}=await sb.auth.getSession();
    if(session){const {data}=await sb.from('admin_users').select('user_id').eq('user_id',session.user.id).maybeSingle();isAdmin=!!data}}
  applyUi(); render();
}
$('teamPresetList').addEventListener('click',async e=>{
  const l=e.target.dataset.load, d=e.target.dataset.del;
  if(l){const p=presets.find(x=>x.id===l); if(p&&p.data&&typeof p.data==='object'){setData(p.data);switchTab('calculator');toast(t('presetLoaded'))}}
  if(d&&isAdmin){ if(!confirm(t('confirmDel')))return; const {error}=await sb.from('fuel_presets').delete().eq('id',d); if(error){toast(t('saveFail'));return} toast(t('presetDeleted')); load() }
});
$('admToggle').addEventListener('click',()=>$('admForm').classList.toggle('hidden'));
$('admForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const {error}=await sb.auth.signInWithPassword({email:$('admEmail').value.trim(),password:$('admPass').value});
  if(error){toast(t('loginFail'));return}
  await check();
  if(!isAdmin){toast(t('notAdmin'));await sb.auth.signOut();await check();return}
  $('admPass').value='';$('admForm').classList.add('hidden');
});
$('admLogout').addEventListener('click',async()=>{await sb.auth.signOut();await check()});
$('presetForm').addEventListener('submit',async e=>{
  e.preventDefault(); if(!isAdmin)return;
  const {error}=await sb.from('fuel_presets').insert({name:$('presetName').value.trim(),data:getData()});
  if(error){console.warn(error);toast(t('saveFail'));return}
  $('presetName').value='';toast(t('presetSaved'));load();
});
addEventListener('langchange',()=>{applyUi();render()});
applyUi(); render();
if(sb){ await load(); await check(); }
