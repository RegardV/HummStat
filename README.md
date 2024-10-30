# HumStat - Trading Analytics Dashboard
Untested. But the idea is to take the hummingbot logfile path and transaction log file and feed it into HummStat. Setup as a container on the same system where the logfile is updated by Hummingbot
![{E2EF4D84-9EC1-41AD-802B-713FB6B359C3}](https://github.com/user-attachments/assets/bab8b70e-d4c3-4ee8-8c00-67deb40e181e)


Beta.
HumStat is a real-time trading analytics dashboard that visualizes trading data from Hummingbotlog files. It provides insights into trading activities, including order history, price trends, and performance metrics.

![HumStat Dashboard](screenshot.png)

## Features

- Real-time log file monitoring
- Price trend visualization
- Order tracking (open/closed)
- Trading performance metrics
- Responsive design
- Live updates

## Authors

**Project Lead:**
- Regard Vermeulen - Project Architect & Lead Designer

**Development:**
- Bolt - AI Development Assistant

## Quick Start with Docker

### Prerequisites

- Docker
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/humstat.git
   cd humstat
   ```

2. Build the Docker image:
   ```bash
   docker build -t humstat .
   ```

3. Run the container:
   ```bash
   docker run -d -p 8080:80 humstat
   ```

4. Access the dashboard at `http://localhost:8080`

## Development Setup

### Prerequisites

- Node.js (v20 or later)
- npm (v9 or later)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Access the dashboard at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Launch the application
2. Upload a trading log file using the file input in the top right
3. The dashboard will automatically update with your trading data
4. Toggle between Dashboard and Analytics views for different insights

### Log File Format

The application expects log files with JSON events in the following format:

```
EVENT_LOG {"event_name": "BuyOrderCreatedEvent", "order_id": "123", "trading_pair": "BTC-USDT", "amount": "0.1", "price": "50000", "timestamp": 1634567890}
```

Supported event types:
- BuyOrderCreatedEvent
- SellOrderCreatedEvent
- OrderFilledEvent

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed #Opensource

## Support

No Support will be given at present.   
