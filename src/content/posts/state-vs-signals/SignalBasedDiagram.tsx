import { useEffect, useRef } from 'preact/hooks'

const SignalBasedDiagram = () => {
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
      strokeColor?: string
    ) => {
      ctx.save()
      ctx.globalAlpha = opacity

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      ctx.strokeStyle =
        strokeColor ||
        color.replace('0.1', '1').replace('0.3', '1').replace('0.6', '1')
      ctx.lineWidth = 2
      ctx.stroke()

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
      width: number = 2
    ) => {
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.stroke()
    }

    const centerX = rect.width / 2
    const signalGreen = '#51cf66'
    const grayColor = '#e9ecef'

    // Responsive spacing based on available width
    const maxWidth = Math.min(rect.width, 500) // Cap at 500px for large screens
    const childSpacing = maxWidth * 0.2 // 20% of available width
    const leftChild = centerX - childSpacing
    const rightChild = centerX + childSpacing

    // Draw title
    ctx.fillStyle = '#51cf66'
    ctx.font =
      'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Signal-Based Rendering', centerX, 30)

    // Root node
    drawNode(
      centerX,
      80,
      30,
      'rgba(81, 207, 102, 0.1)',
      'useSignal',
      0.2,
      signalGreen
    )

    // Lines to children
    drawLine(centerX, 110, leftChild, 140, '#999')
    drawLine(centerX, 110, centerX, 140, '#999')
    drawLine(centerX, 110, rightChild, 140, '#999')

    // Child nodes (only middle one active)
    drawNode(leftChild, 160, 25, grayColor, 'Child 1', 1, '#999')
    drawNode(
      centerX,
      160,
      25,
      'rgba(81, 207, 102, 0.3)',
      'Child 2',
      0.4,
      signalGreen
    )
    drawNode(rightChild, 160, 25, grayColor, 'Child 3', 1, '#999')

    // Lines to grandchildren
    drawLine(leftChild, 185, leftChild, 220, '#999', 1)
    drawLine(centerX, 185, centerX, 220, signalGreen, 2)
    drawLine(rightChild, 185, rightChild, 220, '#999', 1)

    // Grandchild nodes (only middle one re-renders)
    drawNode(leftChild, 240, 20, grayColor, 'GC 1', 1, '#999')
    drawNode(
      centerX,
      240,
      20,
      'rgba(81, 207, 102, 0.6)',
      'GC 2',
      0.7,
      signalGreen
    )
    drawNode(rightChild, 240, 20, grayColor, 'GC 3', 1, '#999')

    // Description text
    ctx.fillStyle = '#666'
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText('Only components accessing', centerX, 290)
    ctx.fillStyle = '#999'
    ctx.font =
      'italic 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.fillText('signal.value re-render', centerX, 308)
  }, [])

  return (
    <div
      style={{
        marginBottom: '30px',
        padding: '20px',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
        borderRadius: '8px',
        borderLeft: '4px solid #51cf66',
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

export default SignalBasedDiagram
