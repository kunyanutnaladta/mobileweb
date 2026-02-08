import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonNote,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';

interface Expense {
  id: string;
  title: string;
  amount: number;
  type: string;
}

const ListExpenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const history = useHistory();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'expenses'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Expense[];

      setExpenses(data);
    });

    return () => unsub();
  }, []);

  const totalIncome = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const deleteExpense = async (id: string) => {
    if (window.confirm('ต้องการลบรายการนี้หรือไม่?')) {
      await deleteDoc(doc(db, 'expenses', id));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>รายการรายรับรายจ่าย</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* ปุ่มเพิ่มรายการ */}
        <IonButton expand="block" onClick={() => history.push('/add')}>
          เพิ่มรายการ
        </IonButton>

        {/* การ์ดสรุปยอด */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard color="success">
                <IonCardContent>
                  <h2>รายรับรวม</h2>
                  <h1>{totalIncome}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol>
              <IonCard color="danger">
                <IonCardContent>
                  <h2>รายจ่ายรวม</h2>
                  <h1>{totalExpense}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* รายการ */}
        <IonList>
          {expenses.map(exp => (
            <IonItem key={exp.id}>
              <IonLabel>
                <h2>{exp.title}</h2>
                <p>
                  {exp.type === 'income' ? 'รายรับ' : 'รายจ่าย'}
                </p>
              </IonLabel>

              <IonNote
                slot="end"
                color={exp.type === 'income' ? 'success' : 'danger'}
              >
                {exp.type === 'income' ? '+' : '-'} {exp.amount}
              </IonNote>

              {/* ปุ่มแก้ไข */}
              <IonButton
                size="small"
                fill="outline"
                onClick={() => history.push(`/edit/${exp.id}`)}
              >
                แก้ไข
              </IonButton>

              {/* ปุ่มลบ */}
              <IonButton
                size="small"
                color="danger"
                onClick={() => deleteExpense(exp.id)}
              >
                ลบ
              </IonButton>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default ListExpenses;
