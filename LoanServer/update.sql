ALTER TABLE contratos ADD COLUMN contrato_cuotas int DEFAULT 0;
ALTER TABLE pagos ADD COLUMN pago_cuota int DEFAULT 0;
ALTER TABLE pagos ADD COLUMN pago_ref_cuota int DEFAULT 0;

CREATE INDEX idx_pagos_cuota
    ON public.pagos USING btree
    (pago_cuota ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX p_index6
    ON public.pagos USING btree
    (pago_cuota ASC NULLS LAST,pago_contrato ASC NULLS LAST,pago_estado ASC NULLS LAST)
    TABLESPACE pg_default;