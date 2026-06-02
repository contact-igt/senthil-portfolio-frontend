// ✓ tokens: none | layout: flex, absolute, relative | split: visual graphic sub-component
'use strict';

import React from 'react';
import styles from './Partnerships.module.css';

/* ── Avatars for Zoom & Laurence graphics ── */
function UserAvatar({ initial, color }: { initial: string; color: string }) {
  return (
    <div className={styles.avatarCircle} style={{ backgroundColor: color }}>
      <span className={styles.avatarText}>{initial}</span>
    </div>
  );
}

/* ── Zoom Graphic ── */
export function ZoomGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.zoomBg}`} aria-hidden="true">
      <div className={styles.zoomAvatars}>
        <UserAvatar initial="JM" color="#3B82F6" />
        <UserAvatar initial="RH" color="#4F46E5" />
      </div>
      <div className={styles.zoomLogo}>
        <span>zoom</span>
      </div>
    </div>
  );
}

/* ── Soft Skills Graphic ── */
export function SoftSkillsGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.skillsBg}`} aria-hidden="true">
      <div className={styles.skillsLeftDecoration}>
        {/* Stopwatch Outline */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2 2M12 2v3M9 2h6" />
        </svg>
      </div>
      
      <div className={styles.skillsContent}>
        <div className={styles.skillsTitle}>SOFT SKILLS</div>
        <div className={styles.skillsHighlight}>YOU NEED AS A DESIGNER</div>
      </div>
      
      <div className={styles.skillsRightDecoration}>
        {/* Calendar/Notepad Outline */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </div>
    </div>
  );
}

/* ── Laurence Graphic ── */
export function LaurenceGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.laurenceBg}`} aria-hidden="true">
      <div className={styles.laurenceLeft}>
        {/* Lightbulb Outline */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5">
          <path d="M15 14c.2-.2.4-.4.6-.7C16.8 11.7 17 10 16 8.5c-1-1.5-2.8-2-4.5-1.5S8.8 8.7 9 10.5c.1.9.4 1.7.9 2.4.3.4.5.8.6 1.1h4.5z" />
          <path d="M9 18h6M10 21h4" />
        </svg>
      </div>
      
      <div className={styles.laurenceAvatars}>
        <UserAvatar initial="LM" color="#D97706" />
        <UserAvatar initial="RH" color="#4F46E5" />
      </div>

      <div className={styles.laurenceRight}>
        <div className={styles.dotsPattern}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}

/* ── Freelance vs Full-time Graphic ── */
export function FreelanceGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.freelanceBg}`} aria-hidden="true">
      <div className={styles.freelanceText}>
        <span>FREELANCE</span>
        <span className={styles.vsBadge}>VS</span>
        <span>FULL-TIME</span>
      </div>
      
      <div className={styles.laptopMock}>
        <div className={styles.laptopScreen}>
          <div className={styles.codeLines}>
            <div className={styles.codeLineShort} />
            <div className={styles.codeLineLong} />
            <div className={styles.codeLineShort} />
          </div>
        </div>
        <div className={styles.laptopKeyboard} />
      </div>
    </div>
  );
}

/* ── AI Graphic ── */
export function AIGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.aiBg}`} aria-hidden="true">
      <div className={styles.aiGlow} />
      
      {/* SVG Neural Mesh Constellation */}
      <svg className={styles.aiMesh} width="100%" height="100%" viewBox="0 0 200 120" fill="none">
        <defs>
          <radialGradient id="meshGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Glow backdrop behind central nodes */}
        <circle cx="100" cy="60" r="40" fill="url(#meshGlow)" />
        
        {/* Connection Lines */}
        <line x1="40" y1="30" x2="80" y2="40" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1" />
        <line x1="80" y1="40" x2="100" y2="60" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1.5" />
        <line x1="100" y1="60" x2="140" y2="45" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1.5" />
        <line x1="140" y1="45" x2="170" y2="80" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1" />
        <line x1="80" y1="40" x2="70" y2="85" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1" />
        <line x1="70" y1="85" x2="100" y2="60" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1.5" />
        <line x1="100" y1="60" x2="120" y2="90" stroke="rgba(129, 140, 248, 0.4)" strokeWidth="1.5" />
        <line x1="120" y1="90" x2="140" y2="45" stroke="rgba(129, 140, 248, 0.25)" strokeWidth="1" />
        <line x1="40" y1="30" x2="70" y2="85" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1" />
        <line x1="120" y1="90" x2="170" y2="80" stroke="rgba(129, 140, 248, 0.15)" strokeWidth="1" />
        
        {/* Nodes */}
        <circle cx="40" cy="30" r="3" fill="#6366f1" opacity="0.6" />
        <circle cx="80" cy="40" r="4" fill="#818cf8" />
        <circle cx="70" cy="85" r="3.5" fill="#818cf8" opacity="0.7" />
        <circle cx="140" cy="45" r="4" fill="#818cf8" />
        <circle cx="120" cy="90" r="3" fill="#6366f1" opacity="0.8" />
        <circle cx="170" cy="80" r="3.5" fill="#6366f1" opacity="0.6" />
        
        {/* Pulsing Core Node */}
        <circle cx="100" cy="60" r="6" fill="#c7d2fe" />
        <circle className={styles.aiCorePulse} cx="100" cy="60" r="10" stroke="#818cf8" strokeWidth="1.5" opacity="0.8" />
      </svg>

      <div className={styles.aiLabel}>
        <span className={styles.aiLabelMono}>AI WORKFLOW</span>
        <div className={styles.aiStatusBadge}>
          <span className={styles.aiStatusDot} />
          <span>ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ── Figma Graphic ── */
export function FigmaGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.figmaBg}`} aria-hidden="true">
      {/* Figma color pill accents (stacked circles) */}
      <div className={styles.figmaBrandMark}>
        <div className={styles.figmaDotRed} />
        <div className={styles.figmaDotOrange} />
        <div className={styles.figmaDotPurple} />
        <div className={styles.figmaDotBlue} />
        <div className={styles.figmaDotGreen} />
      </div>

      {/* SVG Canvas Artboard selection box */}
      <div className={styles.figmaArtboard}>
        <div className={styles.figmaOutline}>
          <div className={styles.figmaHandle} style={{ top: -4, left: -4 }} />
          <div className={styles.figmaHandle} style={{ top: -4, right: -4 }} />
          <div className={styles.figmaHandle} style={{ bottom: -4, left: -4 }} />
          <div className={styles.figmaHandle} style={{ bottom: -4, right: -4 }} />
          
          <div className={styles.figmaArtboardLabel}>HeroSection</div>
        </div>

        {/* Figma Designer Mouse Cursor */}
        <div className={styles.figmaCursorWrapper}>
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path d="M0 0l13.5 6.5-6 1.5L11 14.5l-2.5 1-3.5-6.5-5 4V0z" fill="#0c8ce9" />
          </svg>
          <div className={styles.figmaCursorTag}>RH (Designer)</div>
        </div>
      </div>
    </div>
  );
}

/* ── Content Graphic ── */
export function ContentGraphic() {
  return (
    <div className={`${styles.graphicContainer} ${styles.contentBg}`} aria-hidden="true">
      <div className={styles.contentDoc}>
        <div className={styles.contentDocHeader}>
          <div className={styles.contentDocTitleLine} />
          <div className={styles.contentDocMetaLine} />
        </div>
        
        <div className={styles.contentDocBody}>
          <div className={styles.contentDocLine} />
          <div className={styles.contentDocLine} />
          {/* A highlighted line representing editing/content hierarchy */}
          <div className={styles.contentDocLineHighlight}>
            <span className={styles.highlightMarker}>Content Strategy</span>
          </div>
          <div className={styles.contentDocLine} style={{ width: '85%' }} />
          <div className={styles.contentDocLine} style={{ width: '90%' }} />
          <div className={styles.contentDocLineHighlight} style={{ width: '60%' }}>
            <span className={styles.highlightMarker} style={{ backgroundColor: 'rgba(108, 92, 231, 0.15)', color: '#6c5ce7' }}>User Persona</span>
          </div>
          <div className={styles.contentDocLine} style={{ width: '40%' }} />
        </div>
      </div>

      <div className={styles.contentPencil}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
          <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>
    </div>
  );
}

