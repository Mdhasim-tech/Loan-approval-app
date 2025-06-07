import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score,classification_report,confusion_matrix
df=pd.read_csv('loan.csv')
# print(df.head())
# print(df.columns)
# print(df.describe())
# print(df.shape)


#Data prepocessing
df.drop(columns=['Loan_ID'],inplace=True)#Dropping the unneccessary column

#Handling the missing values
# print(df.isnull())
# print(df.isnull().sum())

# Categorical columns (mode)
df['Gender'] = df['Gender'].fillna(df['Gender'].mode()[0])
df['Married'] = df['Married'].fillna(df['Married'].mode()[0])
df['Dependents'] = df['Dependents'].fillna(df['Dependents'].mode()[0])
df['Self_Employed'] = df['Self_Employed'].fillna(df['Self_Employed'].mode()[0])
df['Credit_History'] = df['Credit_History'].fillna(df['Credit_History'].mode()[0])

# Numeric columns (median)
df['LoanAmount'] = df['LoanAmount'].fillna(df['LoanAmount'].median())
df['Loan_Amount_Term'] = df['Loan_Amount_Term'].fillna(df['Loan_Amount_Term'].median())

# print(df.isnull().sum())

#Encode Categorical variables-as machine do not understand strings
#We’ll use simple Label Encoding here (map strings to numbers).
df['Gender']=df['Gender'].map({"Male":1,"Female":0})
df['Married']=df['Married'].map({"Yes":1,"No":0})
df['Self_Employed']=df['Self_Employed'].map({"Yes":1,"No":0})
df['Loan_Status']=df['Loan_Status'].map({"Y":1,"N":0})
df['Education'] = df['Education'].map({'Graduate': 1, 'Not Graduate': 0})

#Here as there is more than 2 categories we can use one hot encoding but we will use label encoding here
df['Property_Area'] = df['Property_Area'].map({
    'Rural': 0,
    'Semiurban': 1,
    'Urban': 2
})

df['Dependents']=df['Dependents'].replace('3+',3).astype(int)

#Train/Test split of the data -dividing the data into the training and the testing data
#Features (X) the independent variable=all columns except target
X=df.drop(columns=['Loan_Status'])
print(X.columns)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


#Target (y) the dependent variable what we want to predict=Loan_Status
y=df['Loan_Status']
#Split
X_train,X_test,y_train,y_test=train_test_split(
    X_scaled,y,test_size=0.2,random_state=42)


#Choose the model and Train the model
model=LogisticRegression(max_iter=1000)
model.fit(X_train,y_train)

#Test the model make the prediction on Test set
y_pred=model.predict(X_test)
# print(y_pred)

#Evaluation of the model
# Accuracy
# print("Accuracy:", accuracy_score(y_test, y_pred))

# Detailed performance
# print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Confusion matrix
# print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))

#Save the trained model
joblib.dump(model,'loan_approval_model.pkl')
joblib.dump(scaler, 'scaler.pkl')



