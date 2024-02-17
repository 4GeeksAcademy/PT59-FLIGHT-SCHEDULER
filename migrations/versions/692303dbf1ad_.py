"""empty message

Revision ID: 692303dbf1ad
Revises: ed513089cd66
Create Date: 2024-02-17 00:42:24.706322

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '692303dbf1ad'
down_revision = 'ed513089cd66'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservation', schema=None) as batch_op:
        batch_op.drop_column('flight_time')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservation', schema=None) as batch_op:
        batch_op.add_column(sa.Column('flight_time', sa.INTEGER(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
