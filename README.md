# Classic Pong Game 🏓

A modern implementation of the classic Pong game using HTML5 Canvas, JavaScript, and CSS. This is a browser-based version where you play against an AI opponent.

## 🎮 Game Features

- Smooth paddle and ball movement
- AI opponent with realistic movement
- Mouse-controlled player paddle
- Dynamic ball physics with "spin" effect
- Clean, minimalist design
- Responsive canvas gameplay 
- Center net visualization

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional)

### Installation

1. Clone this repository or download the files:
   - index.html
   - script.js
   - styles.css

2. Run the game:
   - Simply open `index.html` in your web browser
   - Or serve through a local web server

## 🕹️ How to Play

1. Move your mouse up and down to control the left paddle (blue)
2. The AI controls the right paddle (red)
3. Try to get the ball past the AI's paddle to score
4. The ball will reset to the center after each point
5. The game continues indefinitely - perfect for practice!

## 🛠️ Technical Details

### Technologies Used
- HTML5 Canvas for game rendering
- Vanilla JavaScript for game logic
- CSS for styling and layout

### Game Components
- Canvas size: 800x500 pixels
- Player paddle (left, blue)
- AI paddle (right, red)
- Ball with dynamic movement
- Center net visualization

### Key Features Implementation
- Collision detection for paddles and walls
- Dynamic ball speed and direction
- AI paddle movement logic
- Mouse-based player control
- Smooth animation using requestAnimationFrame

## 🎨 Customization

You can customize the game by modifying these constants in `script.js`:

```javascript
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const BALL_SIZE = 14;
const PADDLE_MARGIN = 18;
const PLAYER_COLOR = "#09f";
const AI_COLOR = "#f33";
const BALL_COLOR = "#fff";
```

## 🤝 Contributing

Feel free to fork this project and make your own modifications. Some ideas for improvements:
- Add scoring system
- Implement sound effects
- Add start/pause functionality
- Create different AI difficulty levels
- Add power-ups or special effects

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the original Pong game by Atari
- Built with modern web technologies
- Created for educational purposes
