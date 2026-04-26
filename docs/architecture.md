# Architecture

```text
Merchant Dashboard -> Payment API -> Payment State Store
        |                 |
        v                 v
 Checkout Page      Blockchain Adapter
        |
        v
 Customer Payment Flow
```

## Design Notes

- Merchant-facing and customer-facing surfaces are separate applications.
- Payment status is modeled as a state machine instead of scattered booleans.
- External provider interactions are isolated behind adapters.
- Webhooks and polling update the same invoice lifecycle.
- Sensitive signing and wallet operations remain server-side in the private implementation.

## Public-Safe Simplification

This showcase does not include blockchain adapters, private key handling, webhook verification, merchant secrets, real invoice schemas, or production database access.
