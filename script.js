/**
 * Widget Chat Híbrido - Lógica Principal
 * Propiedad de: Eliana "Rage" Avila (@rxgeit)
 * © Todos los derechos reservados.
 */

// INYECCIÓN HTML (SVGs)
const htmlContent = `
<div id="main-container"></div>
<svg style="display:none;">
  <defs>
    <linearGradient id="grad-svg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:var(--grad-start);" />
      <stop offset="100%" style="stop-color:var(--grad-end);" />
    </linearGradient>
  </defs>
  <symbol id="icon-evt-follow" viewBox="0 0 35.43 29.37"><path d="M17.71,29.37c-.96,0-1.93-.32-2.71-.97l-10.99-9.01C1.46,17.3,0,14.22,0,10.93c0-2.06.57-4.07,1.66-5.79C3.67,1.92,7.14,0,10.93,0c2.5,0,4.86.83,6.78,2.35,1.92-1.53,4.28-2.35,6.78-2.35,3.8,0,7.27,1.93,9.28,5.15,1.08,1.73,1.65,3.73,1.65,5.78,0,3.04-1.25,5.9-3.44,7.96v.03l-.55.46-11.01,9.02c-.79.64-1.75.97-2.71.97ZM10.93,3c-2.75,0-5.27,1.4-6.73,3.73-.79,1.25-1.2,2.7-1.2,4.2,0,2.39,1.06,4.62,2.9,6.13l.32.26,10.68,8.76c.47.39,1.15.39,1.62,0l11.01-9.03c1.84-1.51,2.89-3.74,2.89-6.12,0-1.49-.41-2.94-1.19-4.19-1.46-2.34-3.98-3.74-6.74-3.74-2.17,0-4.2.86-5.71,2.42l-1.08,1.11-1.08-1.11c-1.51-1.56-3.53-2.42-5.71-2.42Z" fill="currentColor"/></symbol>
  <symbol id="icon-evt-donar" viewBox="0 0 23.08 31.38"><path d="M11.25,31.38c-2.2,0-3.93-1.36-4.42-3.42-5.05-1.31-6.83-4.61-6.83-7.1,0-1.92,1-3.87,2.95-4.72-1.91-1.57-2.4-3.58-2.4-5.25,0-3.61,2.36-6.4,6.33-7.53.52-2.01,2.24-3.35,4.37-3.35s3.78,1.25,4.37,3.22c4.29,1,6.84,3.38,6.84,6.4,0,1.66-.76,3.38-2.2,4.35,1.84,1.31,2.82,3.25,2.82,5.65,0,4.09-2.76,7.2-7.42,8.37-.51,2.06-2.21,3.39-4.41,3.39ZM5.2,18.69c-2.09,0-2.2,1.8-2.2,2.16,0,1.59,1.54,3.54,4.98,4.3.9.15,1.51.79,1.73,1.9.17,1.11.93,1.33,1.54,1.33.85,0,1.38-.44,1.53-1.27.18-.83.53-1.67,1.85-1.95,3.46-.77,5.45-2.79,5.45-5.53,0-1.97-1.02-3.27-3.11-3.98-1.1-.37-2.35-.55-3.55-.73-2.5-.36-5.33-.78-5.33-3.45,0-1.45,1.09-2.91,3.17-2.91,1.92,0,3.38,1.31,4.01,1.87l.27.24c.77.69,1.25,1.08,2.06,1.08,1.48,0,1.87-1.39,1.87-2.12,0-1.85-2.48-3.04-4.79-3.53-.99-.15-1.63-.75-1.87-1.82-.13-.58-.5-1.26-1.55-1.26-.8,0-1.34.46-1.5,1.25-.26,1.2-.83,1.6-1.72,1.9l-.1.03c-1.64.42-4.38,1.6-4.38,4.71,0,1.38.45,3.33,4.34,4.31.61.15,1.27.27,1.9.38,2.27.41,5.11.92,5.11,3.43,0,1.66-1.38,2.91-3.2,2.91-1.7,0-2.8-1-3.7-1.81-.97-.88-1.63-1.42-2.79-1.42ZM7.35,28.08s.04.01.07.01c-.02,0-.04,0-.07-.01Z" fill="currentColor"/></symbol>
  <symbol id="icon-evt-sub" viewBox="0 0 35 28.4"><path d="M24.65,28.4c-2.78,0-6.53-.03-8.87-.06-1.47.02-3.95.05-5.93.06h-.01c-2.48,0-4.69-1.57-5.49-3.92L.15,12.28c-.34-1-.09-2.09.66-2.84.75-.75,1.84-1,2.85-.65l6.61,2.31L15.04,1.52c.47-.94,1.41-1.52,2.46-1.52s1.99.58,2.46,1.52l4.78,9.57,6.61-2.31c1-.35,2.09-.1,2.84.65s1.01,1.84.66,2.84l-4.19,12.2c-.8,2.34-3,3.92-5.47,3.92-.17,0-.35,0-.54,0ZM15.77,25.35c2.52.03,6.6.06,9.41.06,1.19,0,2.25-.76,2.64-1.89l4.02-11.72-7.03,2.45c-.9.32-1.91-.09-2.34-.95l-4.98-9.98-4.97,9.98c-.43.86-1.43,1.27-2.34.95l-7.03-2.45,4.02,11.72c.39,1.13,1.45,1.89,2.65,1.89h0c1.97,0,4.44-.04,5.94-.06ZM23.83,11.41s0,0,0,0h0Z" fill="currentColor"/></symbol>
  <symbol id="icon-evt-tips" viewBox="0 0 28.61 27.55"><path d="M20.95,27.55c-.56,0-1.13-.14-1.65-.41l-4.29-2.26c-.44-.23-.96-.23-1.4,0l-4.3,2.26c-1.2.63-2.64.53-3.74-.27-1.1-.8-1.64-2.13-1.41-3.47l.82-4.78c.08-.49-.08-.99-.43-1.33l-3.48-3.39c-.97-.95-1.32-2.34-.9-3.64s1.52-2.22,2.86-2.41l4.8-.69c.49-.07.91-.38,1.13-.82l2.15-4.35c.6-1.22,1.82-1.98,3.18-1.98s2.58.76,3.18,1.98l2.15,4.35c.22.44.64.75,1.13.82l4.8.69c1.35.19,2.44,1.12,2.86,2.41s.08,2.69-.9,3.64l-3.48,3.39c-.35.35-.52.84-.43,1.33l.82,4.78c.23,1.34-.31,2.67-1.41,3.47-.62.45-1.35.68-2.08.68ZM14.3,21.7c.72,0,1.44.17,2.1.52l4.29,2.26c.26.14.47.03.57-.04.1-.07.27-.24.22-.53l-.82-4.78c-.25-1.46.23-2.95,1.3-3.99l3.48-3.39c.21-.21.18-.44.14-.56-.04-.12-.15-.33-.44-.37l-4.8-.69c-1.47-.21-2.74-1.13-3.39-2.47l-2.15-4.35c-.13-.27-.36-.3-.49-.3s-.36.04-.49.3l-2.15,4.35c-.66,1.33-1.93,2.25-3.39,2.47l-4.8.69c-.29.04-.4.25-.44.37-.04.12-.07.35.14.56l3.48,3.39c1.06,1.04,1.55,2.53,1.3,3.99l-.82,4.78c-.05.29.11.46.22.53.1.08.31.18.58.04l4.29-2.26c.66-.35,1.38-.52,2.1-.52Z" fill="currentColor"/></symbol>
  <symbol id="chat-icon-reg" viewBox="0 0 18.86 15.34"><path d="M18.86,5.48c0,1.71-.78,3.23-2,4.24h0s-6.4,5.25-6.4,5.25c-.6.49-1.45.49-2.05,0l-6.2-5.09-.19-.16C.78,8.72,0,7.19,0,5.48c0-1.06.3-2.06.83-2.9C1.8,1.03,3.52,0,5.48,0c1.55,0,2.95.64,3.95,1.67,1-1.03,2.4-1.67,3.95-1.67,1.97,0,3.69,1.03,4.66,2.59.52.84.82,1.83.82,2.9Z" fill="currentColor"/></symbol>
  <symbol id="chat-icon-mod" viewBox="0 0 23.73 22.57"><polygon points="15.53 0 8.2 0 2.27 4.31 0 11.28 2.27 18.26 8.2 22.57 15.53 22.57 21.46 18.26 23.73 11.28 21.46 4.31 15.53 0" fill="currentColor"/><path d="M17.6,16.07c-.29.85-1.09,1.42-1.98,1.42-1.37,0-3.37-.02-4.59-.03-.74,0-1.94.02-2.91.03-.9,0-1.7-.57-2-1.42l-2.05-5.96c-.17-.48.3-.94.78-.77l3.67,1.28c.1.03.2,0,.25-.1l2.54-5.1c.22-.45.87-.45,1.09,0l2.54,5.1c.05.09.15.13.25.1l3.67-1.28c.48-.17.94.29.78.77l-2.05,5.97Z" fill="#fff"/></symbol>
  <symbol id="chat-icon-sub" viewBox="0 0 18.85 18.13"><path d="M11.26,1.14l1.1,2.24c.44.89,1.28,1.5,2.26,1.64l2.47.36c1.68.24,2.35,2.31,1.13,3.49l-1.79,1.74c-.71.69-1.03,1.69-.86,2.66l.42,2.46c.29,1.67-1.47,2.95-2.97,2.16l-2.21-1.16c-.88-.46-1.92-.46-2.8,0l-2.21,1.16c-1.5.79-3.26-.48-2.97-2.16l.42-2.46c.17-.98-.16-1.97-.86-2.66l-1.79-1.74c-1.22-1.18-.55-3.25,1.13-3.49l2.47-.36c.98-.14,1.83-.76,2.26-1.64l1.1-2.24c.75-1.52,2.92-1.52,3.67,0Z" fill="currentColor"/></symbol>
  <symbol id="chat-icon-vip" viewBox="0 0 20.21 16.05"><path d="M17.52,14.21c-.38,1.1-1.4,1.83-2.56,1.84-1.78,0-4.36-.02-5.93-.04-.95.01-2.51.03-3.76.04-1.16,0-2.2-.73-2.58-1.84L.04,6.5c-.21-.62.38-1.22,1.01-1l4.75,1.66c.12.04.26-.01.32-.13L9.4.44c.29-.58,1.12-.58,1.41,0l3.29,6.59c.06.12.19.17.32.13l4.75-1.66c.62-.22,1.22.38,1.01,1l-2.65,7.71Z" fill="currentColor"/></symbol>
</svg>
`;

// Insertar HTML
document.body.insertAdjacentHTML('afterbegin', htmlContent);

let totalEvents = 0;
let config = {};

window.addEventListener('onWidgetLoad', (obj) => {
    config = obj.detail.fieldData;
    
    // Inyectar variables SVG
let totalEvents = 0;
let config = {};

window.addEventListener('onWidgetLoad', (obj) => {
    config = obj.detail.fieldData;
    
    // Alineación
    const align = config.globalAlign || 'left';
    document.getElementById('main-container').style.alignItems = align === 'right' ? 'flex-end' : 'flex-start';

    if (config.showEmotes === "false") document.body.classList.add('no-emotes');
    if (config.previewMode === "true") setTimeout(triggerPreview, 1000);
});

window.addEventListener('onEventReceived', (obj) => {
    const l = obj.detail.listener;
    const e = obj.detail.event;
    
    if (l === 'message') {
        // Filtros
        if (config.hideBots === 'yes') {
            const bots = (config.botNames || "").toLowerCase().split(',').map(s=>s.trim());
            if (bots.includes(e.data.displayName.toLowerCase())) return;
        }
        if (config.hideCommands === 'yes') {
            const prefixes = (config.commandPrefixes || "").split(',').map(s=>s.trim());
            if (prefixes.some(p => e.data.text.startsWith(p))) return;
        }

        const d = e.data; const t = d.tags; let r = 'reg';
        if (t.mod === "1" || t.broadcaster === "1") r = 'mod';
        else if (t.vip === "1") r = 'vip';
        else if (t.subscriber === "1") r = 'sub';
        
        renderChat(d.displayName, d.text, r);
    } else handleAlerts(l, e);
});

function handleAlerts(l, e) {
    let i = 'icon-evt-follow'; let r = 'f'; let a = config.tFollow;
    if (l === 'subscriber-latest') { i = 'icon-evt-sub'; r = 's'; a = e.amount > 1 ? config.tResub : config.tSub; }
    else if (l === 'tip-latest') { i = 'icon-evt-donar'; r = 't'; a = config.tTip; }
    else if (l === 'cheer-latest') { i = 'icon-evt-tips'; r = 'c'; a = config.tCheer; }
    renderAlert(i, e.name || "User", a, e.amount || "", r);
}

function getStyle(r) {
    const borderBg = config[r + 'BorderType'] === 'grad' 
        ? `linear-gradient(90deg, ${config[r + 'BStart']}, ${config[r + 'BEnd']})` 
        : config[r + 'BSolid'];
        
    const innerBg = config[r + 'InnerType'] === 'grad'
        ? `linear-gradient(90deg, ${config[r + 'InStart']}, ${config[r + 'InEnd']})`
        : config[r + 'InSolid'];

    const hasBorder = config[r + 'BorderShow'] === 'yes';
    
    const isChat = ['reg', 'sub', 'mod', 'vip'].includes(r);
    const padding = isChat ? config.chatGap : config.eventGap;

    const txtName = config[r + 'TxtName'] || config[r + 'Txt'];
    const txtMsg = config[r + 'TxtMsg'] || config[r + 'Txt'];

    return `
        --out-bg: ${config[r + 'OutBg']};
        --padding-gap: ${padding}px;
        --b-thick: ${hasBorder ? config.borderThickness : 0}px;
        --b-grad: ${borderBg};
        --in-bg: ${innerBg};
        --txt-color: ${config[r + 'Txt']};
        --txt-name: ${txtName};
        --txt-msg: ${txtMsg};
        --badge-bg: ${config[r + 'BadgeBg']};
        --badge-txt: ${config[r + 'BadgeTxt']};
        --ico-color: ${config[r + 'IconColor']};
    `;
}

function renderChat(u, m, r) {
    const s = getStyle(r);
    const i = `chat-icon-${r}`;
    const side = (r === 'mod' || r === 'vip') ? `right: ${config[r+'PosSide']}px; left: auto;` : `left: ${config[r+'PosSide']}px;`;
    const h = `<div class="entry-row type-${r}" style="${s}">
        <div class="chat-badge" style="top:${config[r+'PosTop']}px; ${side}">
            <svg class="badge-svg"><use xlink:href="#${i}"></use></svg><span>${u}</span>
        </div>
        <div class="outer-box"><div class="border-layer"><div class="content-layer">
            <span>${m}</span>
        </div></div></div>
    </div>`;
    append(h);
}

function renderAlert(i, n, a, m, r) {
    const s = getStyle(r);
    const h = `<div class="entry-row type-alert type-evt-${r}" style="${s}">
        <div class="outer-box"><div class="border-layer"><div class="content-layer alert-content">
            <svg class="svg-icon"><use xlink:href="#${i}"></use></svg>
            <div><span class="ev-name">${n}</span> <span class="ev-action">${a}</span> <span class="ev-amount">${m}</span></div>
        </div></div></div>
    </div>`;
    append(h);
}

function append(h) {
    const c = document.getElementById('main-container');
    const w = document.createElement('div'); w.innerHTML = h; const el = w.firstChild;
    c.appendChild(el); totalEvents++;
    setTimeout(() => { 
        el.classList.add('removing'); 
        setTimeout(() => { if(el.parentNode) el.parentNode.removeChild(el); totalEvents--; }, 500); 
    }, config.hideDelay * 1000);
    if (totalEvents > 12) { const o = c.firstChild; o.classList.add('removing'); setTimeout(() => c.removeChild(o), 400); totalEvents--; }
}

function triggerPreview() {
    renderChat("Streamer", "¡Mensaje de prueba con tu fuente elegida!", "mod");
    setTimeout(() => handleAlerts('follower-latest', {name: "Seguidor"}), 1500);
    setTimeout(() => renderChat("Suscriptor", "Probando...", "sub"), 3000);
    setTimeout(() => handleAlerts('tip-latest', {name: "Donador", amount: "$50"}), 4500);
    setTimeout(() => handleAlerts('cheer-latest', {name: "CheerUser", amount: "100"}), 6000);
}
