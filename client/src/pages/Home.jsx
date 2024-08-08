import Button from "../components/ui/Button"
import TextInput from "../components/ui/TextInput"

export default function Home() {
  return (
    <div className="px-3 py-3 flex ">
      <TextInput label="First Name"/>
      <TextInput />
      <div> 

      <Button>Hello</Button>
      <Button variant="secondary">Hello</Button>
      </div>
    </div>
  )
}
