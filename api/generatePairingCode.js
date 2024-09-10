import { exec } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { phoneNumber } = req.body;

        // Run the Python script
        exec(`python3 generate_code.py ${phoneNumber}`, (error, stdout, stderr) => {
            if (error) {
                res.status(500).json({ error: 'Error generating pairing code' });
                return;
            }
            res.status(200).json({ pairingCode: stdout.trim() });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
