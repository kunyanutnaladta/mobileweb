import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

const AddExpense: React.FC = () => {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const saveExpense = async () => {
    if (!title || amount <= 0) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    await addDoc(collection(db, 'expenses'), {
      title,
      amount: Number(amount),
      type,
      category,
      note,
      createdAt: new Date()
    });

    history.push('/list');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>เพิ่มรายการ</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>

            <IonInput
              label="ชื่อรายการ"
              labelPlacement="floating"
              value={title}
              onIonChange={e => setTitle(e.detail.value!)}
            />

            <IonInput
              label="จำนวนเงิน"
              labelPlacement="floating"
              type="number"
              value={amount}
              onIonChange={e => setAmount(Number(e.detail.value))}
            />

            <IonSelect
              label="ประเภท"
              labelPlacement="floating"
              value={type}
              onIonChange={e => setType(e.detail.value)}
            >
              <IonSelectOption value="income">รายรับ</IonSelectOption>
              <IonSelectOption value="expense">รายจ่าย</IonSelectOption>
            </IonSelect>

            <IonInput
              label="หมวดหมู่"
              labelPlacement="floating"
              value={category}
              onIonChange={e => setCategory(e.detail.value!)}
            />

            <IonTextarea
              label="หมายเหตุ"
              labelPlacement="floating"
              value={note}
              onIonChange={e => setNote(e.detail.value!)}
            />

            <IonButton expand="block" onClick={saveExpense}>
              บันทึกข้อมูล
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AddExpense;
