import random
import time
import os
import pyttsx3
from openai import OpenAI
from colorama import Fore, Style, init

# Initialize Colorama
init(autoreset=True)

class EducationalRobot:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)
        self.engine = pyttsx3.init()
        self.setup_voice()
        self.score = 0
        self.student_name = ""
        
        # A-Z Science Database
        self.science_az = {
            'A': ('Astronomy', 'The study of celestial objects and the universe.'),
            'B': ('Biology', 'The study of living organisms.'),
            'C': ('Chemistry', 'The study of matter and its changes.'),
            'D': ('DNA', 'The molecule that carries genetic information.'),
            'E': ('Electricity', 'Flow of electrical power or charge.'),
            'F': ('Fission', 'Splitting of a heavy nucleus into lighter nuclei.'),
            'G': ('Gravity', 'The force that attracts bodies toward the center of the earth.'),
            'H': ('Hydrogen', 'The lightest and most abundant element.'),
            'I': ('Inertia', 'Resistance of an object to change in motion.'),
            'J': ('Jupiter', 'The largest planet in our solar system.'),
            'K': ('Kinetic Energy', 'The energy of a body in motion.'),
            'L': ('Light', 'Electromagnetic radiation visible to the eye.'),
            'M': ('Mitosis', 'Type of cell division resulting in two daughter cells.'),
            'N': ('Newton', 'The SI unit of force.'),
            'O': ('Oxygen', 'Gas vital for respiration in most living things.'),
            'P': ('Photosynthesis', 'Plants using sunlight to synthesize food.'),
            'Q': ('Quantum Mechanics', 'Study of matter at the atomic level.'),
            'R': ('Relativity', 'Einstein\'s theory of space and time.'),
            'S': ('Seismology', 'The study of earthquakes.'),
            'T': ('Thermodynamics', 'Study of heat and energy transfer.'),
            'U': ('Uranium', 'A heavy, radioactive metallic element.'),
            'V': ('Velocity', 'The speed of something in a given direction.'),
            'W': ('Wavelength', 'The distance between successive crests of a wave.'),
            'X': ('X-Ray', 'High-energy electromagnetic radiation.'),
            'Y': ('Yttrium', 'Chemical element used in superconductors.'),
            'Z': ('Zoology', 'The scientific study of the behavior of animals.')
        }

    def setup_voice(self):
        voices = self.engine.getProperty('voices')
        for voice in voices:
            if "female" in voice.name.lower() or "zira" in voice.name.lower():
                self.engine.setProperty('voice', voice.id)
                break
        self.engine.setProperty('rate', 180)

    def speak(self, text):
        print(f"{Fore.CYAN}🔊 Robot: {Style.RESET_ALL}{text}")
        self.engine.say(text)
        self.engine.runAndWait()

    def show_visual(self, header):
        os.system('cls' if os.name == 'nt' else 'clear')
        print(f"{Fore.MAGENTA}{'='*60}")
        print(f"{Fore.YELLOW}🚀 {header.upper()} 🚀")
        print(f"{Fore.MAGENTA}{'='*60}\n")

    def ask_gpt(self):
        self.show_visual("ChatGPT AI Brain")
        self.speak("Ask me anything about science, history, or math.")
        query = input(f"{Fore.GREEN}Your Question: {Style.RESET_ALL}")
        
        print(f"{Fore.YELLOW}🧠 Thinking...", end="", flush=True)
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "system", "content": "Educational robot assistant."},
                          {"role": "user", "content": query}]
            )
            ans = response.choices[0].message.content
            print("\n")
            self.speak(ans)
        except:
            self.speak("Connection error. Check your API key.")

    def math_department(self):
        self.show_visual("Mathematics Department")
        print("1. Arithmetic (Basic)\n2. Algebra (Solve for X)\n3. Geometry (Shapes)\n4. Calculus (Derivatives)")
        choice = input("Select: ")
        
        if choice == "1":
            a, b = random.randint(10, 500), random.randint(10, 500)
            self.speak(f"What is {a} plus {b}?")
            ans = int(input("Answer: "))
            if ans == a+b: self.speak("Excellent Calculation!")
        elif choice == "2":
            x = random.randint(1, 20)
            coeff = random.randint(2, 5)
            result = coeff * x
            self.speak(f"If {coeff}X equals {result}, what is X?")
            ans = int(input("X = "))
            if ans == x: self.speak("Algebra Master!")

    def science_az_explorer(self):
        self.show_visual("Science A-Z Discovery")
        self.speak("Choose a letter from A to Z to learn about a topic.")
        letter = input("Enter Letter: ").upper()
        if letter in self.science_az:
            topic, desc = self.science_az[letter]
            self.show_visual(f"Topic: {topic}")
            self.speak(f"{topic}: {desc}")
            time.sleep(2)
        else:
            self.speak("Invalid letter.")

    def high_level_memory(self):
        self.show_visual("Neural Memory Game")
        self.speak("Memorize this string of 8 random numbers in 3 seconds!")
        seq = "".join([str(random.randint(0,9)) for _ in range(8)])
        print(f"\n{Fore.RED}{Style.BRIGHT}{seq}")
        time.sleep(3)
        os.system('cls' if os.name == 'nt' else 'clear')
        self.speak("Now, what was the sequence?")
        ans = input("Answer: ")
        if ans == seq: self.speak("Genius Level Memory Detected!")
        else: self.speak(f"Incorrect. It was {seq}")

    def multiplication_mayhem(self):
        self.show_visual("Multiplication Time-Attack")
        self.speak("You have 10 seconds for 3 problems. Go!")
        start = time.time()
        for i in range(3):
            a, b = random.randint(12, 20), random.randint(2, 10)
            self.speak(f"What is {a} times {b}?")
            ans = int(input("Answer: "))
            if ans != a*b: break
        
        if time.time() - start < 10:
            self.speak("Speed Demon! You beat the clock.")
        else:
            self.speak("Too slow! Keep practicing.")

    def run(self):
        self.show_visual("Educational Robot Activated")
        self.speak("Welcome. I am your A.I. Tutor. Please tell me your name.")
        self.student_name = input("Name: ")
        
        while True:
            print(f"\n{Fore.WHITE}1. Mathematics (All Topics)")
            print("2. Science A-Z (Bio/Chem/Phys)")
            print("3. Neural Memory Challenge")
            print("4. Multiplication Time-Attack")
            print("5. Ask ChatGPT Anywhere")
            print("0. Power Off")
            
            c = input("\nSelect Category: ")
            if c == "1": self.math_department()
            elif c == "2": self.science_az_explorer()
            elif c == "3": self.high_level_memory()
            elif c == "4": self.multiplication_mayhem()
            elif c == "5": self.ask_gpt()
            elif c == "0": break

if __name__ == "__main__":
    # REPLACE WITH YOUR ACTUAL KEY
    API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    
    if "xxxx" in API_KEY:
        print("Please enter your OpenAI API key in the code.")
    else:
        robot = EducationalRobot(API_KEY)
        robot.run()