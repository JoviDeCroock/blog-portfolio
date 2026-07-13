import type { ComponentChildren } from 'preact'

const textColor = '#E4E4E7'
const mutedText = '#A1A1AA'
const panel = '#111114'
const panelBorder = '#2D2C2C'
const pink = '#EB29A9'
const indigo = '#6366F1'
const green = '#22C55E'
const amber = '#F59E0B'
const cyan = '#38BDF8'
const red = '#F87171'

function DiagramFrame(props: { children: ComponentChildren; caption: string }) {
  return (
    <figure
      style={{
        margin: '1.75rem 50%',
        width: 'min(calc(100vw - 2rem), 56rem)',
        transform: 'translateX(-50%)',
        border: `1px solid ${panelBorder}`,
        borderRadius: '16px',
        background:
          'radial-gradient(circle at top left, rgba(235, 41, 169, 0.16), transparent 32%), #0B0B0C',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '1rem' }}>{props.children}</div>
      <figcaption
        style={{
          borderTop: `1px solid ${panelBorder}`,
          color: mutedText,
          fontSize: '0.9rem',
          padding: '0.85rem 1rem',
        }}
      >
        {props.caption}
      </figcaption>
    </figure>
  )
}

function Label(props: {
  x: number
  y: number
  children: ComponentChildren
  fill?: string
  size?: number
  weight?: number
  anchor?: 'start' | 'middle' | 'end'
}) {
  return (
    <text
      x={props.x}
      y={props.y}
      fill={props.fill || textColor}
      font-size={props.size || 15}
      font-weight={props.weight || 500}
      text-anchor={props.anchor || 'middle'}
      dominant-baseline="middle"
      font-family="Inter, system-ui, sans-serif"
    >
      {props.children}
    </text>
  )
}

function Box(props: {
  x: number
  y: number
  width: number
  height: number
  stroke: string
  fill?: string
  children: ComponentChildren
}) {
  return (
    <g>
      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        rx="14"
        fill={props.fill || panel}
        stroke={props.stroke}
        stroke-width="2"
      />
      {props.children}
    </g>
  )
}

export function ResumedHydrationDiagram() {
  return (
    <DiagramFrame caption="Resumed hydration keeps the server HTML visible, then fills in interactivity as each Suspense boundary can continue.">
      <svg
        viewBox="0 0 820 420"
        role="img"
        aria-labelledby="resumed-hydration-title resumed-hydration-desc"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <title id="resumed-hydration-title">Resumed hydration flow</title>
        <desc id="resumed-hydration-desc">
          Server rendering awaits async boundaries before sending HTML. The
          client hydrates the shell, pauses boundaries that aren't ready, and
          resumes them as their data or JavaScript arrives.
        </desc>
        <defs>
          <marker
            id="resume-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={mutedText} />
          </marker>
        </defs>

        <Label x={410} y={32} size={22} weight={700}>
          One HTML tree, several resumable boundaries
        </Label>

        <Label x={70} y={104} fill={pink} weight={700} anchor="start">
          server
        </Label>
        <Box x={135} y={72} width={150} height={64} stroke={pink}>
          <Label x={210} y={98}>
            render shell
          </Label>
          <Label x={210} y={120} fill={mutedText} size={12}>
            renderToStringAsync
          </Label>
        </Box>
        <Box x={335} y={72} width={150} height={64} stroke={amber}>
          <Label x={410} y={98}>
            await data
          </Label>
          <Label x={410} y={120} fill={mutedText} size={12}>
            Suspense A
          </Label>
        </Box>
        <Box x={535} y={72} width={150} height={64} stroke={indigo}>
          <Label x={610} y={98}>
            await code
          </Label>
          <Label x={610} y={120} fill={mutedText} size={12}>
            Suspense B
          </Label>
        </Box>

        <line
          x1="288"
          y1="104"
          x2="328"
          y2="104"
          stroke={mutedText}
          stroke-width="2"
          marker-end="url(#resume-arrow)"
        />
        <line
          x1="488"
          y1="104"
          x2="528"
          y2="104"
          stroke={mutedText}
          stroke-width="2"
          marker-end="url(#resume-arrow)"
        />

        <path
          d="M 610 142 C 596 186 492 206 410 206 C 310 206 230 196 210 214"
          fill="none"
          stroke={green}
          stroke-width="2.5"
          stroke-dasharray="6 7"
          marker-end="url(#resume-arrow)"
        />
        <rect
          x="256"
          y="156"
          width="308"
          height="28"
          rx="14"
          fill="#0B0B0C"
          stroke="rgba(34, 197, 94, 0.35)"
        />
        <Label x={410} y={170} fill={green} size={13}>
          finished HTML is already visible
        </Label>

        <Label x={70} y={246} fill={cyan} weight={700} anchor="start">
          client
        </Label>
        <Box x={135} y={214} width={150} height={64} stroke={cyan}>
          <Label x={210} y={240}>
            hydrate shell
          </Label>
          <Label x={210} y={262} fill={mutedText} size={12}>
            attach handlers
          </Label>
        </Box>
        <Box x={335} y={214} width={150} height={64} stroke={amber}>
          <Label x={410} y={240}>
            pause boundary
          </Label>
          <Label x={410} y={262} fill={mutedText} size={12}>
            wait for A
          </Label>
        </Box>
        <Box x={535} y={214} width={150} height={64} stroke={indigo}>
          <Label x={610} y={240}>
            resume boundary
          </Label>
          <Label x={610} y={262} fill={mutedText} size={12}>
            continue B
          </Label>
        </Box>

        <line
          x1="288"
          y1="246"
          x2="328"
          y2="246"
          stroke={mutedText}
          stroke-width="2"
          marker-end="url(#resume-arrow)"
        />
        <line
          x1="488"
          y1="246"
          x2="528"
          y2="246"
          stroke={mutedText}
          stroke-width="2"
          marker-end="url(#resume-arrow)"
        />

        <rect
          x="135"
          y="328"
          width="550"
          height="44"
          rx="22"
          fill="rgba(34, 197, 94, 0.12)"
          stroke="rgba(34, 197, 94, 0.7)"
        />
        <Label x={410} y={350} fill={green} size={14}>
          fallback is skipped during hydration because the real DOM is already
          there
        </Label>
      </svg>
    </DiagramFrame>
  )
}

export function UseIdStabilityDiagram() {
  return (
    <DiagramFrame caption="The useId problem is not producing unique ids; it is producing the same ids when async boundaries finish in different orders.">
      <svg
        viewBox="0 0 820 430"
        role="img"
        aria-labelledby="useid-title useid-desc"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <title id="useid-title">useId stability across Suspense</title>
        <desc id="useid-desc">
          A server render resolves Suspense boundary A before B. A client render
          may resolve B before A. If identifiers follow completion order, the
          same fields receive different ids.
        </desc>
        <defs>
          <marker
            id="useid-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={mutedText} />
          </marker>
        </defs>

        <Label x={410} y={34} size={22} weight={700}>
          Stable ids need tree position, not resolution order
        </Label>

        <Box x={66} y={78} width={300} height={204} stroke={pink}>
          <Label x={216} y={108} fill={pink} weight={700}>
            server order
          </Label>
          <Label x={216} y={136} fill={mutedText} size={13}>
            A resolves, then B resolves
          </Label>
          <rect
            x="104"
            y="170"
            width="100"
            height="52"
            rx="12"
            fill="#19191D"
          />
          <rect
            x="228"
            y="170"
            width="100"
            height="52"
            rx="12"
            fill="#19191D"
          />
          <Label x={154} y={190} fill={amber}>
            A
          </Label>
          <Label x={154} y={210} fill={textColor} size={13}>
            P1-0
          </Label>
          <Label x={278} y={190} fill={indigo}>
            B
          </Label>
          <Label x={278} y={210} fill={textColor} size={13}>
            P2-0
          </Label>
          <line
            x1="204"
            y1="196"
            x2="226"
            y2="196"
            stroke={mutedText}
            stroke-width="2"
            marker-end="url(#useid-arrow)"
          />
        </Box>

        <Box x={454} y={78} width={300} height={204} stroke={red}>
          <Label x={604} y={108} fill={red} weight={700}>
            client order
          </Label>
          <Label x={604} y={136} fill={mutedText} size={13}>
            B resolves, then A resolves
          </Label>
          <rect
            x="492"
            y="170"
            width="100"
            height="52"
            rx="12"
            fill="#19191D"
          />
          <rect
            x="616"
            y="170"
            width="100"
            height="52"
            rx="12"
            fill="#19191D"
          />
          <Label x={542} y={190} fill={indigo}>
            B
          </Label>
          <Label x={542} y={210} fill={textColor} size={13}>
            P1-0
          </Label>
          <Label x={666} y={190} fill={amber}>
            A
          </Label>
          <Label x={666} y={210} fill={textColor} size={13}>
            P2-0
          </Label>
          <line
            x1="592"
            y1="196"
            x2="614"
            y2="196"
            stroke={mutedText}
            stroke-width="2"
            marker-end="url(#useid-arrow)"
          />
        </Box>

        <path
          d="M 368 180 C 400 166 420 166 452 180"
          fill="none"
          stroke={mutedText}
          stroke-width="2"
          stroke-dasharray="5 6"
        />
        <Label x={410} y={218} fill={red} size={13}>
          same VNode, different id
        </Label>

        <rect
          x="98"
          y="326"
          width="624"
          height="54"
          rx="18"
          fill="rgba(99, 102, 241, 0.14)"
          stroke="rgba(99, 102, 241, 0.75)"
        />
        <Label x={410} y={344} fill={textColor} size={14}>
          The fix has to anchor the id space to the Suspense boundary's place
        </Label>
        <Label x={410} y={364} fill={mutedText} size={13}>
          in the tree, even when client-only branches appear during hydration.
        </Label>
      </svg>
    </DiagramFrame>
  )
}

export function StreamingHydrationDiagram() {
  return (
    <DiagramFrame caption="Streaming changes the pause button: the server can flush a shell and fallbacks first, then send completed boundary HTML as it resolves.">
      <svg
        viewBox="0 0 820 420"
        role="img"
        aria-labelledby="streaming-title streaming-desc"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      >
        <title id="streaming-title">
          Streaming compared to resumed hydration
        </title>
        <desc id="streaming-desc">
          Resumed hydration sends completed HTML and resumes paused client
          boundaries later. Streaming sends the shell earlier, includes
          fallbacks, and streams completed boundary HTML later.
        </desc>
        <defs>
          <marker
            id="stream-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={mutedText} />
          </marker>
        </defs>

        <Label x={410} y={34} size={22} weight={700}>
          Waiting for HTML vs streaming HTML
        </Label>

        <Box x={64} y={76} width={312} height={250} stroke={cyan}>
          <Label x={220} y={108} fill={cyan} weight={700}>
            resumed hydration
          </Label>
          <rect
            x="104"
            y="144"
            width="232"
            height="34"
            rx="10"
            fill="#19191D"
          />
          <Label x={220} y={161} size={13}>
            render full HTML
          </Label>
          <line
            x1="220"
            y1="182"
            x2="220"
            y2="212"
            stroke={mutedText}
            stroke-width="2"
            marker-end="url(#stream-arrow)"
          />
          <rect
            x="104"
            y="216"
            width="232"
            height="34"
            rx="10"
            fill="#19191D"
          />
          <Label x={220} y={233} size={13}>
            send visible DOM
          </Label>
          <line
            x1="220"
            y1="254"
            x2="220"
            y2="284"
            stroke={mutedText}
            stroke-width="2"
            marker-end="url(#stream-arrow)"
          />
          <rect
            x="104"
            y="288"
            width="232"
            height="34"
            rx="10"
            fill="#19191D"
          />
          <Label x={220} y={305} size={13}>
            resume interactivity
          </Label>
        </Box>

        <Box x={444} y={76} width={312} height={250} stroke={green}>
          <Label x={600} y={108} fill={green} weight={700}>
            streaming
          </Label>
          <rect
            x="484"
            y="144"
            width="232"
            height="34"
            rx="10"
            fill="#19191D"
          />
          <Label x={600} y={161} size={13}>
            flush shell + fallback
          </Label>
          <line
            x1="600"
            y1="182"
            x2="600"
            y2="212"
            stroke={mutedText}
            stroke-width="2"
            marker-end="url(#stream-arrow)"
          />
          <rect
            x="484"
            y="216"
            width="232"
            height="34"
            rx="10"
            fill="#19191D"
          />
          <Label x={600} y={233} size={13}>
            stream resolved HTML
          </Label>
          <line
            x1="600"
            y1="254"
            x2="600"
            y2="284"
            stroke={mutedText}
            stroke-width="2"
            marker-end="url(#stream-arrow)"
          />
          <rect
            x="484"
            y="288"
            width="232"
            height="34"
            rx="10"
            fill="#19191D"
          />
          <Label x={600} y={305} size={13}>
            hydrate arrived chunks
          </Label>
        </Box>

        <rect
          x="108"
          y="358"
          width="604"
          height="40"
          rx="20"
          fill="rgba(245, 158, 11, 0.12)"
          stroke="rgba(245, 158, 11, 0.8)"
        />
        <Label x={410} y={378} fill={amber} size={14}>
          both keep the user looking at useful HTML while JavaScript catches up
        </Label>
      </svg>
    </DiagramFrame>
  )
}
