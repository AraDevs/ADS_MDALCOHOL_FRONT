import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { PurchaseState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';
import { of } from 'rxjs';
import * as objectPath from 'object-path';

export const purchaseFeature = createFeatureSelector<AppState, PurchaseState>(FEATURE_KEY);
export const selectPurchaseDetail = createSelector(purchaseFeature, (purchase: PurchaseState) => {
  const { purchaseDetail: detail } = purchase;
  return detail;
  // if (detail !== null) {
  //   const items = detail.bill_item.map((item: any) => {
  //     const total = parseInt(item.quantity, 10) * parseFloat(item.price);
  //     return { ...item, total };
  //   });

  //   const detailsConfig = [
  //     { title: 'Bill.BillDetail.Num', key: 'id' },
  //     { title: 'Bill.BillDetail.BillDate', key: 'bill_date' },
  //     { title: 'Bill.BillDetail.BusinessName', key: 'client.business_name' },
  //     { title: 'Bill.BillDetail.BillType', key: 'bill_type' },
  //     { title: 'Bill.BillDetail.PaymentType', key: 'payment_type' },
  //   ];

  //   const totalsConf = [
  //     { title: 'Bill.BillDetail.Perception', key: 'perception_value' },
  //     { title: 'Bill.BillDetail.Iva', key: 'iva' },
  //     { title: 'Bill.BillDetail.Total', key: 'total' },
  //   ];

  //   const details = detailsConfig.map((config) => {
  //     const value = objectPath.get(detail, config.key);
  //     return { title: config.title, value };
  //   });

  //   const totals = totalsConf.map((config) => {
  //     const value = objectPath.get(detail, config.key);
  //     return { title: config.title, value };
  //   });

  //   return {
  //     details,
  //     totals,
  //     items$: of(items),
  //   };
  // }

  // return detail;
});
