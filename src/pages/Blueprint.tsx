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
  margin-bottom: 1rem;
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
        <PrincipleNumber>1</PrincipleNumber>
        <PrincipleTitle>Challenge the status quo</PrincipleTitle>
        <PrincipleDescription>
          Established solutions have their own trade-offs, we need to evaluate whether they fit in our frame.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleNumber>2</PrincipleNumber>
        <PrincipleTitle>Prefers simple, elegant and minimalistic solutions</PrincipleTitle>
        <PrincipleDescription>
          It's easy to create and bolt on to solutions all the time, this makes them increasingly hard to maintain.
          A single elegant small abstraction can alleviate these burdens, dare to duplicate and abstract when needed.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleNumber>3</PrincipleNumber>
        <PrincipleTitle>Say the thing</PrincipleTitle>
        <PrincipleDescription>
          I value direct feedback, the only way to grow is to know what we're lacking in.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleNumber>4</PrincipleNumber>
        <PrincipleTitle>Iterate rapidly</PrincipleTitle>
        <PrincipleDescription>
          We need to learn and we need to learn continuously, this can only be done through data and prototyping.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleNumber>5</PrincipleNumber>
        <PrincipleTitle>Force multiply</PrincipleTitle>
        <PrincipleDescription>
          Enabling others is more valuable than any individual task.
        </PrincipleDescription>
      </PrincipleCard>

      <PrincipleCard>
        <PrincipleNumber>6</PrincipleNumber>
        <PrincipleTitle>Default to action</PrincipleTitle>
        <PrincipleDescription>
          We need to move the needle, actioning is my reaction to most conversations.
        </PrincipleDescription>
      </PrincipleCard>
    </PrincipleGrid>
  </main>
)

export default Blueprint
