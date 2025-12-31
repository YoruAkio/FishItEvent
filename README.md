<div align="center">

# Fish It Event

This website is for who don’t know when the Fish It events started on their local time.

[Live Demo](https://fish-it-event.yoruakio.xyz) · [Report Bug](https://discord.com/users/919841186246692886)

</div>

## Features

- Real-time countdown timers for all events
- Automatic timezone detection and conversion
- Support for English and Indonesian
- Clean and simple interface

## API Reference

Event data is fetched from the [Roblox Virtual Events API](https://devforum.roblox.com/t/is-there-a-way-to-use-api-to-get-the-active-events-of-a-roblox-game/3969276):

```
GET https://apis.roblox.com/virtual-events/v1/universes/{universeId}/virtual-events
```

## Setup

```bash
# Git clone the repository
git clone https://github.com/YoruAkio/FishItEvent.git

# Go to the project directory
cd FishItEvent

# Install dependencies
bun install

# Run development server
bun dev
# or
# Build for production
bun run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
