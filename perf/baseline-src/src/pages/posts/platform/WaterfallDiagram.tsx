import { useEffect, useRef } from 'preact/hooks'

const WaterfallDiagram = () => {
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

    const leftPadding = 80
    const barHeight = 24
    const rowSpacing = 36
    const maxBarWidth = rect.width - leftPadding - 40

    // Helper function to draw a bar
    const drawBar = (
      label: string,
      y: number,
      startPercent: number,
      endPercent: number,
      color: string
    ) => {
      const startX = leftPadding + startPercent * maxBarWidth
      const width = (endPercent - startPercent) * maxBarWidth

      // Draw label
      ctx.fillStyle = '#666'
      ctx.font =
        '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.fillText(label, leftPadding - 10, y + barHeight / 2)

      // Draw bar
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(startX, y, width, barHeight, 4)
      ctx.fill()
    }

    // Without preload section
    let currentY = 20

    ctx.fillStyle = '#ff6b6b'
    ctx.font =
      'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('Without Preload', leftPadding, currentY)

    currentY += 20

    drawBar('HTML', currentY, 0, 0.15, 'rgba(100, 149, 237, 0.8)')
    currentY += rowSpacing

    drawBar('bundle.js', currentY, 0.15, 0.45, 'rgba(255, 193, 7, 0.8)')
    currentY += rowSpacing

    drawBar('JS Execute', currentY, 0.45, 0.55, 'rgba(156, 39, 176, 0.8)')
    currentY += rowSpacing

    drawBar('/api/data', currentY, 0.55, 0.85, 'rgba(76, 175, 80, 0.8)')
    currentY += rowSpacing

    drawBar('Render', currentY, 0.85, 1.0, 'rgba(255, 107, 107, 0.8)')

    // Draw total time indicator
    ctx.fillStyle = '#999'
    ctx.font =
      'italic 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(
      '~1000ms',
      leftPadding + maxBarWidth,
      currentY + barHeight + 15
    )

    // With preload section
    currentY += 60

    ctx.fillStyle = '#4caf50'
    ctx.font =
      'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('With Preload', leftPadding, currentY)

    currentY += 20

    drawBar('HTML', currentY, 0, 0.15, 'rgba(100, 149, 237, 0.8)')
    currentY += rowSpacing

    // These load in parallel!
    drawBar('bundle.js', currentY, 0.15, 0.45, 'rgba(255, 193, 7, 0.8)')
    currentY += rowSpacing

    drawBar('/api/data', currentY, 0.15, 0.45, 'rgba(76, 175, 80, 0.8)')
    currentY += rowSpacing

    drawBar('JS Execute', currentY, 0.45, 0.55, 'rgba(156, 39, 176, 0.8)')
    currentY += rowSpacing

    drawBar('Render', currentY, 0.55, 0.7, 'rgba(255, 107, 107, 0.8)')

    // Draw total time indicator
    ctx.fillStyle = '#4caf50'
    ctx.font =
      'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(
      '~700ms',
      leftPadding + maxBarWidth * 0.7,
      currentY + barHeight + 15
    )

    // Draw "parallel" annotation
    ctx.strokeStyle = '#4caf50'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.beginPath()
    const parallelX = leftPadding + 0.15 * maxBarWidth - 5
    ctx.moveTo(parallelX, currentY - rowSpacing * 2 - 5)
    ctx.lineTo(parallelX, currentY - rowSpacing + barHeight + 5)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#4caf50'
    ctx.font =
      'italic 10px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    ctx.textAlign = 'left'
    ctx.save()
    ctx.translate(parallelX - 12, currentY - rowSpacing * 1.5 + barHeight / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('parallel', 0, 0)
    ctx.restore()
  }, [])

  return (
    <div
      style={{
        marginTop: '12px',
        marginBottom: '12px',
        padding: '12px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '460px',
          display: 'block',
        }}
      />
    </div>
  )
}

export default WaterfallDiagram
