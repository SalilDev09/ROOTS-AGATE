# Root- Agate
ROOTS-AGATE addresses the challenge of tracing Ayurvedic herbs from the source to formulation, leveraging blockchain immutability and geo-tagging to:

Prevent adulteration

Maintain supply chain transparency

Ensure herb provenance and authenticity

Integrate farmers and collectors in a secure system

Features

Geo-tagging of collection points – Farmers & wild collectors

Blockchain ledger – Secure, tamper-proof traceability

Batch-level provenance tracking – From harvest to final product

Supply chain transparency – Helps manufacturers, regulators, and consumers

Authenticity verification – Prevents mislabeling & fraud

Web/Streamlit interface – Optional interactive dashboard

Architecture
Farmers / Wild Collectors
        │
        ▼
    Geo-Tagging
        │
        ▼
  Blockchain Ledger
        │
        ▼
 Manufacturers / Ayurvedic Companies
        │
        ▼
 Final Formulation Label + Verification


Data flow: Each batch of herbs is geo-tagged at collection → recorded on blockchain → verified at processing → final label includes traceable ID.

Installation

Clone this repository:

git clone https://github.com/SalilDev09/ROOTS-AGATE.git
cd ROOTS-AGATE


Install dependencies (example for Python/Streamlit setup):

pip install -r requirements.txt


Run the application:

streamlit run app.py


Adjust steps based on your actual implementation (Python, Node.js, or other).

Usage

Add collection points via the dashboard or CSV

Each batch automatically gets a unique blockchain ID

Track batches in real-time from collection → processing → final product

Verify authenticity using the batch ID
