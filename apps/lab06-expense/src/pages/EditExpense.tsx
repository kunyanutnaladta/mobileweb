import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams, useHistory } from 'react-router-dom';

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const ref = doc(db, 'expenses', id);
      const snap = await getDoc(ref);
      const data = snap.data();
      if (data) {
        setTitle(data.title);
        setAmount(data.amount);
      }
    };
    load();
  }, [id]);

  const updateExpense = async () => {
    await updateDoc(doc(db, 'expenses', id), {
      title,
      amount
    });
    history.push('/list');
  };

  const deleteExpense = async () => {
    if (window.confirm('ต้องการลบรายการนี้หรือไม่?')) {
      await deleteDoc(doc(db, 'expenses', id));
      history.push('/list');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>แก้ไขรายการ</IonTitle>
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

            <IonButton expand="block" onClick={updateExpense}>
              อัปเดต
            </IonButton>

            <IonButton
              expand="block"
              color="danger"
              onClick={deleteExpense}
            >
              ลบข้อมูล
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EditExpense;
