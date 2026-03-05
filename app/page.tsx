'use client';

import { useEffect, useState } from 'react';
import { fetchWordPressAPI } from '@/lib/graphql';
import { ENDPOINTS } from '@/lib/queries';

interface PostItem {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  featured_image?: number;
}

export default function Home() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Construir query string con parámetros
        const queryParams = new URLSearchParams();
        queryParams.append('per_page', '5');
        queryParams.append('orderby', 'date');
        queryParams.append('order', 'desc');

        const data = await fetchWordPressAPI<PostItem[]>(
          `${ENDPOINTS.POSTS}?${queryParams.toString()}`
        );

        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      <h1>¡Hola Mundo! 👋</h1>
      <p>Bienvenido a GynecomastiadMD - Sitio construido con Next.js</p>

      <section
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h2>Prueba de Conexión REST API</h2>

        {loading && <p>🔄 Cargando posts desde WordPress...</p>}

        {error && (
          <div
            style={{
              color: '#d32f2f',
              padding: '1rem',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
            }}
          >
            <p>
              <strong>❌ Error:</strong> {error}
            </p>
            <details>
              <summary>Ver detalles</summary>
              <pre
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.85rem',
                  overflow: 'auto',
                }}
              >
                Asegúrate de que:
                1. El endpoint REST está correcto:{' '}
                {process.env.NEXT_PUBLIC_API_ENDPOINT}
                2. Las credenciales están configuradas en .env.local
                3. El usuario {'{'}API_USERNAME{'}'} tiene permisos para leer posts
              </pre>
            </details>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div style={{ color: '#2e7d32' }}>
            <p>✅ Conexión exitosa con WordPress REST API</p>
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #4caf50',
              }}
            >
              <h3>Posts Recientes ({posts.length})</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    style={{
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <strong>{post.title.rendered}</strong>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                      {post.slug} - {new Date(post.date).toLocaleDateString('es-ES')}
                    </p>
                    <p
                      style={{
                        margin: '0.25rem 0',
                        fontSize: '0.85rem',
                        color: '#555',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.slice(0, 150) + '...',
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p>ℹ️ No hay posts disponibles en el sitio</p>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Próximos Pasos</h2>
        <ul>
          <li>✅ Proyecto Next.js con TypeScript configurado</li>
          <li>✅ Cliente REST API listo para consultas</li>
          <li>✅ Conexión con WordPress REST API funcionando</li>
          <li>⏳ Crear componentes para posts individuales</li>
          <li>⏳ Implementar páginas dinámicas</li>
          <li>⏳ Agregar búsqueda y filtros</li>
          <li>⏳ Desplegar en Vercel</li>
        </ul>
      </section>
    </div>
  );
}
