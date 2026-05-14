# DL- Developing a Deep Learning Model for NER using LSTM

## AIM
To develop an LSTM-based model for recognizing the named entities in the text.

## Problem Statement and Dataset


## DESIGN STEPS
### STEP 1: 
Import the necessary packages.

### STEP 2: 
Load the dataset, and create the word-to-index and tag-to-index mappings.

### STEP 3: 
Create the sequences and pad them to a consistent length.

### STEP 4: 
Split the data into training and testing sets, and create DataLoader instances.

### STEP 5: 
Define the BiLSTMTagger model with Embedding, BiLSTM, and Linear layers.

### STEP 6: 
Train the model, evaluate it on the test set, and visualize the loss.

## PROGRAM

### Name:

### Register Number:

```python
class BiLSTMTagger(nn.Module):
    def __init__(self, vocab_size, num_tags, embedding_dim=50, hidden_dim=50):
        super(BiLSTMTagger, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim, padding_idx=vocab_size-1)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, batch_first=True, bidirectional=True)
        self.fc = nn.Linear(hidden_dim * 2, num_tags)

    def forward(self, input_ids):
        embeds = self.embedding(input_ids)
        lstm_out, _ = self.lstm(embeds)
        tag_space = self.fc(lstm_out)
        return tag_space

model = BiLSTMTagger(vocab_size=len(word2idx) + 1, num_tags=len(tag2idx)).to(device)
loss_fn = nn.CrossEntropyLoss(ignore_index=tag2idx["O"])
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Training and Evaluation Functions
def train_model(model, train_loader, test_loader, loss_fn, optimizer, epochs=3):
    train_losses, val_losses = [], []
    for epoch in range(epochs):
        model.train()
        total_loss = 0
        for batch in train_loader:
            input_ids = batch["input_ids"].to(device)
            labels = batch["labels"].to(device)
            
            optimizer.zero_grad()
            outputs = model(input_ids)
            outputs = outputs.view(-1, outputs.shape[-1])
            labels = labels.view(-1)
            
            loss = loss_fn(outputs, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            
        train_losses.append(total_loss / len(train_loader))
        
        model.eval()
        val_loss = 0
        with torch.no_grad():
            for batch in test_loader:
                input_ids = batch["input_ids"].to(device)
                labels = batch["labels"].to(device)
                outputs = model(input_ids)
                outputs = outputs.view(-1, outputs.shape[-1])
                labels = labels.view(-1)
                loss = loss_fn(outputs, labels)
                val_loss += loss.item()
        
        val_losses.append(val_loss / len(test_loader))
        print(f"Epoch {epoch+1}/{epochs} - Train Loss: {train_losses[-1]:.4f} - Val Loss: {val_losses[-1]:.4f}")
        
    return train_losses, val_losses
```

### OUTPUT

## Loss Vs Epoch Plot

Include your plot here

### Sample Text Prediction
Include your sample text prediction here

## RESULT
Include your result here
