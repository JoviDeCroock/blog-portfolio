import { useEffect, useRef } from 'preact/hooks'

const StateBasedDiagram = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Helper function to draw a node
    const drawNode = (
      x: number,
      y: number,
      radius: number,
      color: string,
      text: string,
      opacity: number = 1,
      dashed: boolean = false
    ) => {
      ctx.save()
      ctx.globalAlpha = opacity

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      if (dashed) {
        ctx.setLineDash([3, 3])
      }
      ctx.strokeStyle = color
        .replace('0.2', '1')
        .replace('0.4', '1')
        .replace('0.6', '1')
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.setLineDash([])

      // Draw text
      ctx.fillStyle = '#333'
      ctx.font =
        'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, x, y)

      ctx.restore()
    }

    // Helper function to draw a line
    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      width: number = 2,
      dashed: boolean = false
    ) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = color
      ctx.lineWidth = width
      if (dashed) {
        ctx.setLineDash([3, 3])
      }
      ctx.stroke()
      ctx.setLineDash([])
    }

    const centerX = rect.width / 2
    const stateColor = 'rgba(255, 107, 107, 0.2)'
    const stateStroke = '#ff6b6b'

    // Responsive spacing based on available width
    const maxWidth = Math.min(rect.width, 500) // Cap at 500px for large screens
    const childSpacing = maxWidth * 0.2 // 20% of available width
    const leftChild = centerX - childSpacing
    const rightChild = centerX + childSpacing

    // Draw title
    ctx.fillStyle = '#ff6b6b'
    ctx.font =
      'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('State-Based Rendering', centerX, 30)

    // Root node
    drawNode(centerX, 80, 30, stateColor, 'useState', 0.3)

    // Lines to children
    drawLine(centerX, 110, leftChild, 140, stateStroke)
    drawLine(centerX, 110, centerX, 140, stateStroke)
    drawLine(centerX, 110, rightChild, 140, stateStroke)

    // Child nodes
    drawNode(leftChild, 160, 25, 'rgba(255, 107, 107, 0.4)', 'Child 1', 0.5)
    drawNode(centerX, 160, 25, 'rgba(255, 107, 107, 0.4)', 'Child 2', 0.5)
    drawNode(rightChild, 160, 25, 'rgba(255, 107, 107, 0.4)', 'Child 3', 0.5)

    // Lines to grandchildren
    drawLine(leftChild, 185, leftChild, 220, stateStroke, 1, true)
    drawLine(centerX, 185, centerX, 220, stateStroke, 2)
    drawLine(rightChild, 185, rightChild, 220, stateStroke, 1, true)

    // Grandchild nodes
    drawNode(leftChild, 240, 20, stateColor, 'GC 1', 0.3, true)
    drawNode(centerX, 240, 20, 'rgba(255, 107, 107, 0.6)', 'GC 2', 0.7)
    drawNode(rightChild, 240, 20, stateColor, 'GC 3', 0.3, true)

    // Description text
    ctx.fillStyle = '#666'
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText('All components re-render', centerX, 290)
    ctx.fillStyle = '#999'
    ctx.font =
      'italic 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText("even if they don't use state", centerX, 308)
  }, [])

  return (
    <div
      style={{
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%)',
        borderRadius: '8px',
        borderLeft: '4px solid #ff6b6b',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '330px',
          display: 'block',
        }}
      />
    </div>
  )
}

export default StateBasedDiagram
