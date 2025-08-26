export const codeSnippets = {
  cpp: `#include <iostream>
#include <string>

// CodeEditor
void greet(std::string name) {
  std::cout << "Greetings, " << name << "!" << std::endl;
}

int main() {
  greet("Earthlings");
  return 0;
}
`,

  csharp: `using System;

// CodeEditor
public class Greeter
{
    public static void Greet(string name)
    {
        Console.WriteLine($"Greetings, {name}!");
    }

    public static void Main(string[] args)
    {
        Greet("Earthlings");
    }
}
`,

  css: `/* Basic Reset & Default Styling */

/* Apply a natural box layout model to all elements */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Basic body styling */
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
  background-color: #f8f9fa;
  color: #212529;
}

/* A simple style for headings */
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
  color: #343a40;
}`,

  go: `package main

import "fmt"

// CodeEditor
func greet(name string) {
	fmt.Printf("Greetings, %s!\\n", name)
}

func main() {
	greet("Earthlings")
}
`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greetings Earthlings</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main>
        <article>
            <h1>Greetings, Earthlings!</h1>
            <p>We have traveled 39 light-years from the Zeta Reticuli system to deliver this message. We come in peace.</p>
            <p>Take us to your leader... or at least to your best taco stand.</p>
        </article>
    </main>
</body>
</html>`,

  java: `// CodeEditor
public class Greeter {
    public static void greet(String name) {
        System.out.println("Greetings, " + name + "!");
    }

    public static void main(String[] args) {
        greet("Earthlings");
    }
}
`,

  javascript: `// CodeEditor
function greet(name) {
  console.log(\`Greetings, \${name}!\`);
}

greet('Earthlings');
`,

  jsx: `// CodeEditor
import React from 'react';

function AlienGreeting({ planet = "Earth" }) {
  const message = \`Greetings, inhabitants of \${planet}!\`;
  
  return (
    <div className="alien-message">
      <h1>🛸 Transmission from Zeta Reticuli</h1>
      <p>{message}</p>
      <button onClick={() => alert('We come in peace!')}>
        Respond to Aliens
      </button>
    </div>
  );
}

export default AlienGreeting;
`,

  json: `{
  "contactId": "ZR-20250606-WBG",
  "arrival": {
    "timestamp": "2025-06-06T09:39:56-04:00",
    "location": "Williamsburg, Brooklyn, New York, USA"
  },
  "vessel": {
    "name": "The Irony",
    "origin": {
      "starSystem": "Zeta Reticuli",
      "planet": "Apex IV",
      "distanceLy": 39.17
    },
    "crewCount": 5
  },
  "hostile": false,
  "initialMessage": "We have triangulated this location as your planet's cultural epicenter. We come in peace.",
  "culturalRequests": [
    "A demonstration of 'pour-over' coffee preparation.",
    "Vinyl pressings from obscure, pre-mainstream indie artists.",
    "An explanation for the appeal of fermented cabbage beverages (kombucha).",
    "One pair of non-prescription spectacles with thick frames."
  ]
}
`,

  kotlin: `// CodeEditor
fun greet(name: String) {
    println("Greetings, $name!")
}

fun main() {
    greet("Earthlings")
}
`,

  php: `<?php
// CodeEditor
function greet($name) {
  echo "Greetings, " . $name . "!\n";
}

greet('Earthlings');
?>
`,

  python: `# CodeEditor
def greet(name):
  print(f"Greetings, {name}!")

greet('Earthlings')
`,

  ruby: `# CodeEditor
def greet(name)
  puts "Greetings, #{name}!"
end

greet('Earthlings')
`,

  rust: `// CodeEditor
fn greet(name: &str) {
    println!("Greetings, {}!", name);
}

fn main() {
    greet("Earthlings");
}
`,

  typescript: `// CodeEditor
function greet(name: string): void {
  console.log(\`Greetings, \${name}!\`);
}

greet('Earthlings');
`,

  tsx: `// CodeEditor
import React, { useState } from 'react';

interface ContactData {
  species: string;
  planet: string;
  peaceful: boolean;
}

const AlienContactForm: React.FC = () => {
  const [contact, setContact] = useState<ContactData>({
    species: 'Human',
    planet: 'Earth',
    peaceful: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(\`Contact established with \${contact.species} from \${contact.planet}\`);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>🌌 Intergalactic Contact Protocol</h2>
      <label>
        Species:
        <input 
          type="text" 
          value={contact.species}
          onChange={(e) => setContact({...contact, species: e.target.value})}
        />
      </label>
      <label>
        Planet:
        <input 
          type="text" 
          value={contact.planet}
          onChange={(e) => setContact({...contact, planet: e.target.value})}
        />
      </label>
      <label>
        <input 
          type="checkbox" 
          checked={contact.peaceful}
          onChange={(e) => setContact({...contact, peaceful: e.target.checked})}
        />
        We come in peace
      </label>
      <button type="submit">Establish Contact</button>
    </form>
  );
};

export default AlienContactForm;
`,
} as const;
