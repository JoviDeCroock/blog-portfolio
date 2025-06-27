import { styled } from 'goober'
import SEO from '../components/Seo'

const Hero = styled('div')`
  width: 100%;
  margin-bottom: 2rem;
`

const PrincipleGrid = styled('div')`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const PrincipleCard = styled('div')`
  border: 1px solid #2D2C2C;
  padding: 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(235, 41, 169, 0.05) 0%, rgba(11, 11, 12, 0.1) 100%);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #EB29A9;
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(235, 41, 169, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #EB29A9, #6366f1);
  }
`

const PrincipleHeader = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const IconContainer = styled('div')`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(235, 41, 169, 0.1), rgba(99, 102, 241, 0.1));
  border-radius: 12px;
  transition: all 0.3s ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: #EB29A9;
    fill: none;
    stroke-width: 2;
    transition: all 0.3s ease;
  }

  ${PrincipleCard}:hover & {
    background: linear-gradient(135deg, rgba(235, 41, 169, 0.2), rgba(99, 102, 241, 0.2));
    transform: scale(1.1);

    svg {
      stroke: #ffffff;
    }
  }
`

const PrincipleNumber = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #EB29A9, #6366f1);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
`

const PrincipleTitle = styled('h3')`
  margin: 0 0 1rem 0;
  color: #FCFCFD;
  font-size: 1.25rem;
  font-weight: 600;
`

const PrincipleDescription = styled('p')`
  margin: 0;
  color: #A1A1AA;
  line-height: 1.6;
`

const IntroText = styled('div')`
  color: #E4E4E7;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 3rem;

  p {
    margin-bottom: 1rem;
  }
`

const Blueprint = () => (
  <main>
    <SEO
      title="Blueprint - Engineering Philosophy"
      description="My core engineering principles and philosophy that guide my approach to software development and team collaboration."
    />
    <Hero>
      <h1>Blueprint</h1>
      <IntroText>
        <p>
          These principles form the foundation of my engineering philosophy.
          They guide how I approach problems, collaborate with teams, and build sustainable solutions.
        </p>
        <p>
          Each principle has been refined through years of experience across different teams,
          projects, and challenges in the software engineering landscape.
        </p>
      </IntroText>
    </Hero>

    <PrincipleGrid>
      <PrincipleCard>
        <PrincipleHeader>
          <IconContainer>
            <svg viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </IconContainer>
        </PrincipleHeader>
        <PrincipleTitle>Challenge the status quo</PrincipleTitle>
        <PrincipleDescription>
          Established solutions have their own trade-offs, we need to evaluate whether they fit in our frame.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleHeader>
          <IconContainer>
            <svg viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </IconContainer>
        </PrincipleHeader>
        <PrincipleTitle>Prefers simple, elegant and minimalistic solutions</PrincipleTitle>
        <PrincipleDescription>
          It's easy to create and bolt on to solutions all the time, this makes them increasingly hard to maintain.
          A single elegant small abstraction can alleviate these burdens, dare to duplicate and abstract when needed.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleHeader>
          <IconContainer>
            <svg viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </IconContainer>
        </PrincipleHeader>
        <PrincipleTitle>Say the thing</PrincipleTitle>
        <PrincipleDescription>
          I value direct feedback, the only way to grow is to know what we're lacking in.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleHeader>
          <IconContainer>
            <svg viewBox="0 0 24 24">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </IconContainer>
        </PrincipleHeader>
        <PrincipleTitle>Iterate rapidly</PrincipleTitle>
        <PrincipleDescription>
          We need to learn and we need to learn continuously, this can only be done through data and prototyping.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleHeader>
          <IconContainer>
            <svg viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </IconContainer>
        </PrincipleHeader>
        <PrincipleTitle>Force multiply</PrincipleTitle>
        <PrincipleDescription>
          Enabling others is more valuable than any individual task.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleHeader>
          <IconContainer>
            <svg viewBox="0 0 24 24">
              <path d="M13 9l3 3-3 3m-4-6L6 12l3 3" />
            </svg>
          </IconContainer>
        </PrincipleHeader>
        <PrincipleTitle>Default to action</PrincipleTitle>
        <PrincipleDescription>
          We need to move the needle, actioning is my reaction to most conversations.
        </PrincipleDescription>
      </PrincipleCard>
    </PrincipleGrid>
  </main>
)

export default Blueprint
