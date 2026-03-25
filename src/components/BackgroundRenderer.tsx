import React, { Suspense } from 'react';
import { BackgroundConfig, BackgroundType } from '../types';

const LazyParticleBackground = React.lazy(() => import('./ParticleBackground').then(m => ({ default: m.ParticleBackground })));
const LazyMatrixBackground = React.lazy(() => import('./MatrixBackground').then(m => ({ default: m.MatrixBackground })));
const LazyWavesBackground = React.lazy(() => import('./WavesBackground').then(m => ({ default: m.WavesBackground })));
const LazyBlobsBackground = React.lazy(() => import('./BlobsBackground').then(m => ({ default: m.BlobsBackground })));
const LazyCircuitBackground = React.lazy(() => import('./CircuitBackground').then(m => ({ default: m.CircuitBackground })));
const LazyGlitchBackground = React.lazy(() => import('./GlitchBackground').then(m => ({ default: m.GlitchBackground })));
const LazyTopologyBackground = React.lazy(() => import('./TopologyBackground').then(m => ({ default: m.TopologyBackground })));
const LazyBeamsBackground = React.lazy(() => import('./BeamsBackground').then(m => ({ default: m.BeamsBackground })));
const LazyPrismBackground = React.lazy(() => import('./PrismBackground').then(m => ({ default: m.PrismBackground })));
const LazySparkBackground = React.lazy(() => import('./SparkBackground').then(m => ({ default: m.SparkBackground })));
const LazyMeshBackground = React.lazy(() => import('./MeshBackground').then(m => ({ default: m.MeshBackground })));
const LazyBentoBackground = React.lazy(() => import('./BentoBackground').then(m => ({ default: m.BentoBackground })));
const LazyGlassBackground = React.lazy(() => import('./GlassBackground').then(m => ({ default: m.GlassBackground })));
const LazySpotlightBackground = React.lazy(() => import('./SpotlightBackground').then(m => ({ default: m.SpotlightBackground })));
const LazyMinimalBackground = React.lazy(() => import('./MinimalBackground').then(m => ({ default: m.MinimalBackground })));
const LazyGrainyBackground = React.lazy(() => import('./GrainyBackground').then(m => ({ default: m.GrainyBackground })));
const LazyStripesBackground = React.lazy(() => import('./StripesBackground').then(m => ({ default: m.StripesBackground })));
const LazyColumnsBackground = React.lazy(() => import('./ColumnsBackground').then(m => ({ default: m.ColumnsBackground })));
const LazyRippleBackground = React.lazy(() => import('./RippleBackground').then(m => ({ default: m.RippleBackground })));
const LazyPoolBackground = React.lazy(() => import('./PoolBackground').then(m => ({ default: m.PoolBackground })));
const LazyGravityBackground = React.lazy(() => import('./GravityBackground').then(m => ({ default: m.GravityBackground })));
const LazyMetaPoolBackground = React.lazy(() => import('./MetaPoolBackground').then(m => ({ default: m.MetaPoolBackground })));
const LazyAuroraBackground = React.lazy(() => import('./AuroraBackground').then(m => ({ default: m.AuroraBackground })));
const LazyRibbonsBackground = React.lazy(() => import('./RibbonsBackground').then(m => ({ default: m.RibbonsBackground })));
const LazyBokehBackground = React.lazy(() => import('./BokehBackground').then(m => ({ default: m.BokehBackground })));
const LazyAvatarBackground = React.lazy(() => import('./AvatarBackground').then(m => ({ default: m.AvatarBackground })));

const BACKGROUND_COMPONENTS: Record<BackgroundType, React.LazyExoticComponent<React.FC<{ config: BackgroundConfig, theme: 'light' | 'dark' }>>> = {
  mesh: LazyMeshBackground,
  bento: LazyBentoBackground,
  glass: LazyGlassBackground,
  particles: LazyParticleBackground,
  waves: LazyWavesBackground,
  matrix: LazyMatrixBackground,
  glitch: LazyGlitchBackground,
  circuit: LazyCircuitBackground,
  topology: LazyTopologyBackground,
  minimal: LazyMinimalBackground,
  prism: LazyPrismBackground,
  beams: LazyBeamsBackground,
  grainy: LazyGrainyBackground,
  blobs: LazyBlobsBackground,
  spark: LazySparkBackground,
  spotlight: LazySpotlightBackground,
  stripes: LazyStripesBackground,
  columns: LazyColumnsBackground,
  ripple: LazyRippleBackground,
  pool: LazyPoolBackground,
  gravity: LazyGravityBackground,
  metapool: LazyMetaPoolBackground,
  aurora: LazyAuroraBackground,
  ribbons: LazyRibbonsBackground,
  bokeh: LazyBokehBackground,
  avatars: LazyAvatarBackground,
};

export const BackgroundRenderer: React.FC<{ config: BackgroundConfig, theme: 'light' | 'dark' }> = React.memo(({ config, theme }) => {
  const Component = BACKGROUND_COMPONENTS[config.type];
  if (!Component) return null;
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-neutral-950" />}>
      <Component key={config.type} config={config} theme={theme} />
    </Suspense>
  );
}, (prev, next) => prev.config === next.config && prev.theme === next.theme);
