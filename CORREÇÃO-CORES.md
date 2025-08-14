# 🚗 Correção do Sistema de Cores dos Carros SVG

## Problema Identificado

Os carros SVG não estavam exibindo cores porque:

1. **SVGs usam `fill="currentColor"`** - Os arquivos SVG estão configurados para usar a cor CSS atual
2. **Componente não definia cor base** - O componente Car não estava definindo uma propriedade `color` CSS
3. **Filtro hue-rotate sem cor base** - O filtro `hue-rotate` precisa de uma cor para rotacionar
4. **currentColor sem valor** - Sem cor CSS definida, `currentColor` herda a cor do texto (geralmente preto)

## Solução Implementada

### 1. Adicionado suporte a `colorMode`
```typescript
interface Props {
  // ... outras props
  color?: string
  colorMode?: 'filter' | 'overlay' | 'replace'  // ← NOVO
}
```

### 2. Sistema de conversão de cores
```typescript
const colorMap: Record<string, string> = {
  red: '0deg',
  orange: '30deg', 
  yellow: '60deg',
  green: '120deg',
  blue: '240deg',
  purple: '270deg',
  pink: '300deg',
}
```

### 3. Três modos de colorização

#### Modo Filter (padrão)
- Usa `hue-rotate()` CSS filter
- Define cor base `#333` para `currentColor` funcionar
- Aceita cores nomeadas e graus
```css
filter: hue-rotate(240deg);
color: #333;
```

#### Modo Overlay
- Usa `currentColor` diretamente
- Aceita cores hex, rgb, rgba
- Cor pura sem filtros
```css
color: #ff4444;
```

#### Modo Replace
- Usa `sepia + hue-rotate + saturate + brightness`
- Cores mais vibrantes e dramáticas
- Recoloração completa do SVG
```css
filter: sepia(1) hue-rotate(240deg) saturate(2) brightness(1.1);
color: #333;
```

## Como Usar

```vue
<!-- Modo Filter (padrão) -->
<Car color="red" />
<Car color="240deg" />

<!-- Modo Overlay -->
<Car color="#ff4444" color-mode="overlay" />

<!-- Modo Replace -->
<Car color="blue" color-mode="replace" />
```

## Arquivos Modificados

- `src/components/Car.vue` - Implementação principal
- `src/views/Home.vue` - Adicionado aviso de correção
- `src/components/transit/RaceTrack.vue` - Já estava preparado

## Resultado

✅ **SVGs agora exibem cores corretamente**
✅ **Três modos diferentes de colorização**  
✅ **Suporte a cores nomeadas e valores customizados**
✅ **Compatibilidade com código existente**
✅ **Melhor controle visual sobre as cores**

## Teste Visual

Abra a aplicação e veja na seção "🎨 Cores dos Carros":
- Cores básicas funcionando
- Três modos de colorização diferentes
- Carros coloridos em movimento
- Aviso de correção no topo da seção
