import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { PurchaseState, FEATURE_KEY } from './reducer';
import { AppState } from '@state/app-state';
import { of } from 'rxjs';
import * as objectPath from 'object-path';

export const purchaseFeature = createFeatureSelector<AppState, PurchaseState>(FEATURE_KEY);
export const selectPurchaseDetail = createSelector(purchaseFeature, (purchase: PurchaseState) => {
  const { purchaseDetail: detail } = purchase;
  if (detail !== null) {
    const items = detail.purchase_item.map((item: any) => {
      const total = parseInt(item.quantity, 10) * parseFloat(item.price);
      return { ...item, total };
    });

    const detailsConfig = [
      { title: 'Purchase.PurchaseDetail.Num', key: 'id' },
      { title: 'Purchase.PurchaseDetail.PurchaseDate', key: 'purchase_date' },
      { title: 'Purchase.PurchaseDetail.PaymentType', key: 'payment_type' },
    ];

    const totalsConf = [
      { title: 'Purchase.PurchaseDetail.Perception', key: 'perception_value' },
      { title: 'Purchase.PurchaseDetail.Total', key: 'total' },
    ];

    const details = detailsConfig.map((config) => {
      const value = objectPath.get(detail, config.key);
      return { title: config.title, value };
    });

    const totals = totalsConf.map((config) => {
      const value = objectPath.get(detail, config.key);
      return { title: config.title, value };
    });

    return {
      details,
      totals,
      items$: of(items),
    };
  }

  return detail;
});
