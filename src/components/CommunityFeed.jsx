import { useState } from 'react';
import { COMMUNITY_POSTS } from '../data/communityPosts';
import { Heart, MessageCircle, Share2, Camera } from 'lucide-react';

export default function CommunityFeed() {
  const [liked, setLiked] = useState({});

  const toggleLike = (id) => {
    setLiked(p => ({ ...p, [id]: !p[id] }));
  };

  return (
    <div className="animate-fade-in-up" style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "28px", color: "var(--color-primary)", marginBottom: "8px" }}>
          Comunidad Cero Desperdicio
        </h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "15px" }}>Inspírate con las creaciones de otros cocineros 🌟</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        {[
          { l: "Recetas compartidas", v: "1,247" },
          { l: "Familias activas", v: "892" },
          { l: "Kg de comida salvada", v: "3.4 t" }
        ].map((s, i) => (
          <div key={s.l} className="card animate-scale-in" style={{ flex: "1", minWidth: "110px", textAlign: "center", padding: "20px 12px", animationDelay: `${i * 0.1}s` }}>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "28px", fontWeight: 700, color: "var(--color-primary)", marginBottom: "4px" }}>{s.v}</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: "13px", fontWeight: 600 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="masonry-grid">
        {COMMUNITY_POSTS.map((post, index) => (
          <div key={post.id} className="card masonry-item card-hover animate-fade-in-up" style={{ animationDelay: `${0.05 * index}s`, padding: "20px" }}>
            <div style={{ fontSize: "56px", textAlign: "center", background: "var(--color-bg)", borderRadius: "16px", padding: "24px", marginBottom: "16px", lineHeight: 1 }}>
              {post.emoji}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: post.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: post.tc }}>
                  {post.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--color-text)" }}>{post.user}</div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: "12px" }}>{post.time}</div>
                </div>
              </div>
            </div>
            
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "18px", color: "var(--color-primary)", marginBottom: "12px", lineHeight: "1.4" }}>{post.recipe}</h4>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
              {post.ingredients.map(ing => (
                <span key={ing} style={{ background: "var(--color-primary-bg)", color: "var(--color-primary)", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }}>
                  {ing}
                </span>
              ))}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--color-divider)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "var(--color-accent)", fontSize: "16px", letterSpacing: "1px" }}>
                  {"★".repeat(Math.floor(post.rating))}
                </span>
                <span style={{ fontWeight: 700, fontSize: "13px", color: "var(--color-text-muted)", marginLeft: "4px" }}>{post.rating}</span>
              </div>
              
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => toggleLike(post.id)}
                  style={{ 
                    background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", 
                    color: liked[post.id] ? "var(--color-danger)" : "var(--color-text-muted)", 
                    fontSize: "13px", fontWeight: 700, transition: "all 0.2s" 
                  }}
                >
                  <Heart size={18} fill={liked[post.id] ? "currentColor" : "none"} /> {post.likes + (liked[post.id] ? 1 : 0)}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}>
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: "20px", textAlign: "center", padding: "40px 24px", background: "linear-gradient(135deg, var(--color-primary-bg) 0%, var(--color-bg) 100%)" }}>
        <div style={{ width: "64px", height: "64px", background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "var(--color-primary)", boxShadow: "var(--shadow-sm)" }}>
          <Camera size={32} />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "22px", color: "var(--color-primary)", marginBottom: "8px" }}>¿Cocinaste algo increíble?</h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "15px", marginBottom: "20px" }}>Comparte tu receta cero desperdicio con la comunidad y ayuda a inspirar a otros.</p>
        <button className="btn">Subir Mi Receta</button>
      </div>
    </div>
  );
}
