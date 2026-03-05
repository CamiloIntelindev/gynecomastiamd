'use client';

import { useEffect, useState } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_SITE_INFO } from '@/lib/queries';

interface SiteInfo {
  generalSettings: {
    title: string;
    description: string;
    url: string;
  };
}

export default function Home() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSiteInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGraphQL<SiteInfo>(GET_SITE_INFO);
        setSiteInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching site info:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSiteInfo();
  }, []);

  return (
    <div>
      <h1>¡Hola Mundo! 👋</h1>
      <p>Bienvenido a GynecomastiadMD - Sitio construido con Next.js</p>

      <section style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Prueba de Conexión GraphQL</h2>
        
        {loading && <p>🔄 Cargando información del sitio...</p>}
        
        {error && (
          <div style={{ color: '#d32f2f', padding: '1rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            <p><strong>❌ Error:</strong> {error}</p>
            <details>
              <summary>Ver detalles</summary>
              <pre style={{ marginTop: '0.5rem', fontSize: '0.85rem', overflow: 'auto' }}>
                Asegúrate de que:
                1. El endpoint GraphQL está correcto: {process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}
                2. Las credenciales están configuradas en .env.local
                3. El usuario de WordPress tiene permisos de acceso a WPGraphQL
              </pre>
            </details>
          </div>
        )}
        
        {siteInfo && (
          <div style={{ color: '#2e7d32' }}>
            <p>✅ Conexión exitosa con WPGraphQL</p>
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #4caf50' }}>
              <h3>{siteInfo.generalSettings.title}</h3>
              <p><strong>URL:</strong> {siteInfo.generalSettings.url}</p>
              <p><strong>Descripción:</strong> {siteInfo.generalSettings.description}</p>
            </div>
          </div>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Próximos Pasos</h2>
        <ul>
          <li>✅ Proyecto Next.js con TypeScript configurado</li>
          <li>✅ Cliente GraphQL listo para consultas</li>
          <li>⏳ Crear páginas y componentes adicionales</li>
          <li>⏳ Implementar autenticación si es necesaria</li>
          <li>⏳ Desplegar en Vercel</li>
        </ul>
      </section>
    </div>
  );
}
