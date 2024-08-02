import { pipeline } from "@xenova/transformers";
import { useCallback, useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

// env.useBrowserCache = false;
// env.allowLocalModels = false;
function App() {
  const [result, setResult] = useState<unknown>(null);
  const [value, setValue] = useState('');
  const handleClick = useCallback(async () => {
    const classifier = await pipeline('sentiment-analysis');
    const res = await classifier(value);
    console.log(result);
    setResult(res);
  }, [result, value]);

  return (
    <div className="p-4 container mx-auto">
      <div className="grid w-full gap-2">
        <Textarea value={value} onChange={({ target: { value: v } }) => setValue(v)} placeholder="Type your message here." />
        <Button onClick={handleClick}>Test</Button>
      </div>
      {!!result && <p>{JSON.stringify(result)}</p>}
    </div>
  )
}

export default App
